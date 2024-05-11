FROM python:3.11

WORKDIR /app/filter/

COPY requirements.txt /app/filter/

RUN pip install -r requirements.txt

COPY . /app/filter/

EXPOSE ${FILTER_PORT}

CMD exec fastapi run app.py --port $FILTER_PORT
