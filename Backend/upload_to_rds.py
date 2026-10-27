"""
Pixtron Systems - Amazon RDS Table Setup & Data Uploader
Creates the 'drug_products' table in Amazon RDS and populates it.
"""

import os
import sys
import csv
from pathlib import Path
from dotenv import load_dotenv

# Fix Windows console encoding
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

backend_dir = Path(__file__).resolve().parent
env_path = backend_dir / ".env"
load_dotenv(dotenv_path=env_path)

RDS_DIALECT = os.getenv("RDS_DIALECT", "postgres").strip().lower()
RDS_HOST = os.getenv("RDS_HOST", "localhost").strip()
RDS_PORT = int(os.getenv("RDS_PORT", "5432" if RDS_DIALECT == "postgres" else "3306"))
RDS_DB_NAME = os.getenv("RDS_DB_NAME", "postgres").strip()
RDS_USER = os.getenv("RDS_USER", "postgres").strip()
RDS_PASSWORD = os.getenv("RDS_PASSWORD", "").strip()
RDS_TABLE_NAME = os.getenv("RDS_TABLE_NAME", "drug_products").strip()

def create_table_and_import(max_records: int = 500):
    print("=" * 65)
    print("  [*] PIXTRON AMAZON RDS INITIALIZATION & DATA UPLOADER")
    print(f"  [*] Dialect:  {RDS_DIALECT}")
    print(f"  [*] Host:     {RDS_HOST}:{RDS_PORT}")
    print(f"  [*] Database: {RDS_DB_NAME}")
    print(f"  [*] Table:    {RDS_TABLE_NAME}")
    print("=" * 65)

    if RDS_DIALECT in ["postgres", "postgresql"]:
        import psycopg
        conn = psycopg.connect(
            host=RDS_HOST,
            port=RDS_PORT,
            dbname=RDS_DB_NAME,
            user=RDS_USER,
            password=RDS_PASSWORD,
            sslmode=os.getenv("RDS_SSLMODE", "require"),
        )
        cursor = conn.cursor()

        # Create table for PostgreSQL
        create_sql = f"""
        CREATE TABLE IF NOT EXISTS {RDS_TABLE_NAME} (
            id SERIAL PRIMARY KEY,
            uid VARCHAR(128) UNIQUE NOT NULL,
            url TEXT,
            proper_and_generic_name TEXT,
            brand_name TEXT,
            manufacturer_name_and_address TEXT,
            batch_number VARCHAR(128),
            date_of_manufacture VARCHAR(64),
            date_of_expiry VARCHAR(64),
            manufacturing_license_number VARCHAR(128),
            details_of_excipients TEXT,
            verification_status VARCHAR(64) DEFAULT 'VERIFIED',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_{RDS_TABLE_NAME}_uid ON {RDS_TABLE_NAME} (uid);
        """
        cursor.execute(create_sql)
        conn.commit()
        print("[+] PostgreSQL table verified/created successfully.")

    else:
        import pymysql
        conn = pymysql.connect(
            host=RDS_HOST,
            port=RDS_PORT,
            database=RDS_DB_NAME,
            user=RDS_USER,
            password=RDS_PASSWORD,
        )
        cursor = conn.cursor()

        # Create table for MySQL
        create_sql = f"""
        CREATE TABLE IF NOT EXISTS {RDS_TABLE_NAME} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            uid VARCHAR(128) UNIQUE NOT NULL,
            url TEXT,
            proper_and_generic_name TEXT,
            brand_name TEXT,
            manufacturer_name_and_address TEXT,
            batch_number VARCHAR(128),
            date_of_manufacture VARCHAR(64),
            date_of_expiry VARCHAR(64),
            manufacturing_license_number VARCHAR(128),
            details_of_excipients TEXT,
            verification_status VARCHAR(64) DEFAULT 'VERIFIED',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_uid (uid)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        """
        cursor.execute(create_sql)
        conn.commit()
        print("[+] MySQL table verified/created successfully.")

    # Populate from CSV
    csv_file = backend_dir / "urls_dataset_3.csv"
    if not csv_file.exists():
        print(f"[!] CSV file not found at {csv_file}")
        return

    print(f"[*] Reading {csv_file} (uploading up to {max_records} records)...")
    inserted = 0
    with open(csv_file, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if inserted >= max_records:
                break

            uid = row.get("uid", "").strip()
            url = row.get("url", "").strip()
            if not uid:
                continue

            insert_sql = f"""
                INSERT INTO {RDS_TABLE_NAME} 
                (uid, url, proper_and_generic_name, brand_name, manufacturer_name_and_address,
                 batch_number, date_of_manufacture, date_of_expiry, manufacturing_license_number,
                 details_of_excipients, verification_status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ON CONFLICT (uid) DO NOTHING;
            """ if RDS_DIALECT in ["postgres", "postgresql"] else f"""
                INSERT IGNORE INTO {RDS_TABLE_NAME} 
                (uid, url, proper_and_generic_name, brand_name, manufacturer_name_and_address,
                 batch_number, date_of_manufacture, date_of_expiry, manufacturing_license_number,
                 details_of_excipients, verification_status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """

            cursor.execute(insert_sql, (
                uid,
                url,
                "Telmisartan 80mg and Hydrochlorothiazide 12.5mg Tablets IP",
                f"TELMA 80 H (Batch {uid[-4:]})",
                "Pixtron Systems Lifesciences Ltd. – Samlik Marchak, Sikkim: 737135",
                f"1824{uid[-4:]}",
                "05 November 2024",
                "31 October 2027",
                "M/602/2012",
                "Microcrystalline Cellulose IP, Lactose Monohydrate IP, Povidone K-30, Magnesium Stearate IP",
                "VERIFIED"
            ))
            inserted += 1

    conn.commit()
    cursor.close()
    conn.close()
    print(f"[+] Successfully uploaded {inserted} records into Amazon RDS table '{RDS_TABLE_NAME}'!")

if __name__ == "__main__":
    create_table_and_import(500)
