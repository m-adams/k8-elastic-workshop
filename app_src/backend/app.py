

from datetime import datetime
from flask import Flask, request, url_for
from flask_cors import CORS
import time
import os

from flask_sqlalchemy import SQLAlchemy
import json
from sqlalchemy import Column, Integer, ForeignKey, DateTime, String, Float
from sqlalchemy.orm import relationship
import requests
import logging

logger = logging.getLogger()
handler = logging.StreamHandler()
formatter = logging.Formatter(
        "%(asctime)s — %(name)s — %(levelname)s — %(funcName)s:%(lineno)d — %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

app = Flask(__name__)

port = os.getenv('PORT', 8080)
database_URL = os.getenv('DATABASE_URL', False)

if database_URL is False:
    app.logger.error("Can't start, require DATABASE_URL environment variable to be set")
    exit()

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')

db = SQLAlchemy(app)

if os.getenv('APM_SERVER_URL', False) is not False:
    from elasticapm.contrib.flask import ElasticAPM

    app.config['ELASTIC_APM'] = {
      # Set required service name. Allowed characters:
      # a-z, A-Z, 0-9, -, _, and space
      'SERVICE_NAME': os.getenv('APM_SERVICE_NAME'),

      # Use if APM Server requires a token
      'SECRET_TOKEN': os.getenv('APM_SECRET_TOKEN'),

      # Set custom APM Server URL (default: http://localhost:8200)
      'SERVER_URL': os.getenv('APM_SERVER_URL'),
    }

    apm = ElasticAPM(app)

class Order(db.Model):
    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    date_added = Column(DateTime)
    items = db.relationship('Item', backref="items", cascade="all, delete-orphan" , lazy='dynamic')
    
    def __repr__(self):
        return '<Order name=%r>' % self.id

    def summary(self): 
        return {
            "id": self.id,
            "items": [i.summary() for i in self.items],
            "date_created": self.date_added.isoformat(),
        }


    def full_details(self):
        return {
            "id": self.id,
            "date_created": self.date_added.isoformat(),
            "items": [i.full_details() for i in self.items]
        }

class Item(db.Model):
    __tablename__ = 'items'
    id = Column('id', Integer, primary_key=True)
    sku = Column(db.String(120))
    title = Column(db.String(120))
    description = Column(db.String(500))
    style = Column(db.String(120))
    price = Column(Float)
    currencyId = Column(db.String(50))
    currencyFormat = Column(db.String(50))
   
    item_id = db.Column(db.Integer, db.ForeignKey('orders.id'))

    def __repr__(self):
        return '<Item name=%r>' % self.name

    def full_details(self): 
        return {
            "id": self.id, 
            "sku": self.sku, 
            "title": self.title,
            "description": self.description,
            "style": self.style,
            "price": self.price,
            "currencyId": self.currencyId,
            "currencyFormat": self.currencyFormat,
        }

@app.before_first_request
def populate():
    app.logger.info("Populating Store...")
    setup_data = [
        {"id": 11, "sku": "01", "title": "Elastic Iceberg T-Shirt", "description": "", "style": "Straight Cut", "price": 20.00, "currencyId": "USD", "currencyFormat": "$"},
        {"id": 12, "sku": "02", "title": "Elastic Iceberg T-Shirt", "description": "", "style": "Fitted Cut", "price": 20.00, "currencyId": "USD", "currencyFormat": "$"},
        {"id": 13, "sku": "03", "title": "Elastic T-Rex T-Shirt", "description": "", "style": "Straight Cut", "price": 20.00, "currencyId": "USD", "currencyFormat": "$"},
        {"id": 14, "sku": "04", "title": "Elastic T-Rex T-Shirt", "description": "", "style": "Fitted Cut", "price": 20.00, "currencyId": "USD", "currencyFormat": "$"},
        {"id": 15, "sku": "05", "title": "Elastic Robot T-Shirt", "description": "", "style": "Straight Cut", "price": 20.00, "currencyId": "USD", "currencyFormat": "$"},
        {"id": 16, "sku": "06", "title": "Elastic Robot T-Shirt", "description": "", "style": "Fitted Cut", "price": 20.00, "currencyId": "USD", "currencyFormat": "$"},
        {"id": 17, "sku": "07", "title": "Kibana Socks", "description": "", "style": "Blue Dot Graph", "price": 10.00, "currencyId": "USD", "currencyFormat": "$"},
        {"id": 18, "sku": "08", "title": "Elastic Cluster T-Shirt", "description": "", "style": "Fitted", "price": 15.00, "currencyId": "USD", "currencyFormat": "$"},
        {"id": 19, "sku": "09", "title": "Elastic Cluster T-Shirt", "description": "", "style": "Straight Cut", "price": 15.00, "currencyId": "USD", "currencyFormat": "$"},
        {"id": 20, "sku": "10", "title": "Elastic backpack", "description": "", "style": "Timbuk2 Uptown", "price": 122.00, "currencyId": "USD", "currencyFormat": "$"},
        {"id": 21, "sku": "11", "title": "Kibana Socks", "description": "", "style": "Yellow Dot Graph", "price": 10.00, "currencyId": "USD", "currencyFormat": "$"},
        {"id": 22, "sku": "12", "title": "Elastic Onesie", "description": "", "style": "Robot", "price": 13.00, "currencyId": "USD", "currencyFormat": "$"}
    ]

    for item in setup_data:
        app.logger.info("Creating Item")
        create_new_item_manual(item)

    app.logger.info("Finished Populating Store")

@app.route('/api/orders', methods=['POST'])
def create_order():
    content = request.json
    item_details = [requests.get(f"http://localhost:{port}/api/items/{i}").json() for i in content['itemIds']] 

    return "failure", 200

@app.route('/api/items', methods=['GET'])
def all_items():
    all_items = Item.query.all()
    return json.dumps([item.full_details() for item in all_items])

@app.route('/api/items', methods=['POST'])
def new_item():
    create_new_item_manual(request.json)

def create_new_item_manual(item):
    app.logger.info(item)
    db.session.add(
        Item(
            id=item["id"],
            sku=item["sku"],
            title=item["title"],
            description=item["description"],
            style=item["style"],
            price=item["price"],
            currencyId=item["currencyId"],
            currencyFormat=item["currencyFormat"]
        )
    )
    db.session.commit()
    return 'success'

@app.route('/api/items/<item_id>', methods=['GET'])
def item_details(item_id):
    if item_id == '14':
        raise Exception('Deliberate exception!')
    elif item_id == '15':
        time.sleep(12)

    specific_item = Item.query.filter_by(id=item_id).first()

    return json.dumps(specific_item.full_details())

if __name__ == '__main__':
    db.drop_all()
    db.create_all()


    app.run(host='0.0.0.0', port=port)
