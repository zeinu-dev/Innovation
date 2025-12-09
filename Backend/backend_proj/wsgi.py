import os
from django.core.wsgi import get_wsgi_application

# Load .env for deployments that place the file here
try:
	from dotenv import load_dotenv
	base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	dotenv_path = os.path.join(base_dir, '.env')
	load_dotenv(dotenv_path)
except Exception:
	pass

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_proj.settings')
application = get_wsgi_application()
