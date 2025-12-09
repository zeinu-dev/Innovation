Quick setup (development):

1. Create and activate virtualenv

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install requirements

```powershell
pip install -r requirements.txt
```

3. Make migrations and migrate

```powershell
python manage.py makemigrations accounts
python manage.py migrate
```

4. Create a superuser (optional)

```powershell
python manage.py createsuperuser
```

5. Run the dev server

```powershell
python manage.py runserver 8000
```

Notes:
- The `Profile` model was added to `accounts.models`. It uses an `ImageField` for `photo`, which requires the `Pillow` package (already added to `requirements.txt`).
- Uploaded files are stored in the `media/` directory during development. Ensure `MEDIA_ROOT` is writable.

Additional notes for `innovations` app:
- A new `innovations` app provides the `Innovation` model and DRF endpoints under `/api/innovations/`.
- The `Innovation` model accepts an optional `attachment` file upload; uploading files requires the server to accept multipart/form-data (the viewset is configured to accept it).
- After pulling these changes run the following to create and apply DB migrations:

```powershell
python manage.py makemigrations accounts innovations
python manage.py migrate
```

Make sure the `media/` directory exists and is writable so uploaded files are stored correctly during development.

Email configuration:
- By default the project uses the console email backend in development (emails are printed to the console).
- To send real emails, set the environment variable `DJANGO_EMAIL_BACKEND` to `django.core.mail.backends.smtp.EmailBackend` and provide SMTP settings via `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_USE_TLS=1`.
- Configure `DEFAULT_FROM_EMAIL` and `FRONTEND_URL` as needed for email content.

Environment file:
- A sample `.env` file has been added at `backend/.env`. It contains the MySQL credentials and sensible defaults for development. Update values for production.

Auto-loading `.env`:
- The project now auto-loads `backend/.env` when running `manage.py` or when served via WSGI, using `python-dotenv`.
- `python-dotenv` was added to `backend/requirements.txt`. Install dependencies after pulling changes.
