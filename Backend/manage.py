#!/usr/bin/env python
import os
import sys

# Load environment variables from backend/.env if present
try:
    from dotenv import load_dotenv
    base_dir = os.path.dirname(os.path.abspath(__file__))
    dotenv_path = os.path.join(base_dir, '.env')
    load_dotenv(dotenv_path)
except Exception:
    # python-dotenv may not be installed in some environments; ignore if unavailable
    pass


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_proj.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and available on your PYTHONPATH?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
