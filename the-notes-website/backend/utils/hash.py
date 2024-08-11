from passlib.context import CryptContext

bcrypt_cxt = CryptContext(schemes='bcrypt', deprecated='auto')

class Bcrypt():
    def hash(password: str):
        return bcrypt_cxt.hash(password)

    def verify(plain_password: str, hashed_password: str):
        return bcrypt_cxt.verify(plain_password, hashed_password)
