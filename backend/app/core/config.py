from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8', extra='ignore')

    app_name: str = 'Resume AI API'
    api_prefix: str = '/api/v1'
    secret_key: str = 'change_me'
    algorithm: str = 'HS256'
    access_token_expire_minutes: int = 60 * 24
    database_url: str = 'postgresql://postgres:postgres@db:5432/resume_ai'
    cors_origins: str = 'http://localhost:5173'


settings = Settings()
