FROM python:3.6

RUN mkdir -p /app_backend

ADD app.py /app_backend
ADD requirements.txt /app_backend

WORKDIR /app_backend/

EXPOSE 8080
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
CMD ["python","app.py"]