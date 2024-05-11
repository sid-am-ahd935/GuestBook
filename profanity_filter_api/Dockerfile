FROM python:3.11

WORKDIR /app/filter/

COPY requirements.txt /app/filter/

RUN pip install -r requirements.txt

COPY . /app/filter/

ENV FILER_PORT 5000

EXPOSE 5000

CMD ["fastapi", "run", "app.py", "--port", "${FILER_PORT}"]