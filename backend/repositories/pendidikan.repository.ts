import { pool } from "../configs/database";
import { Pendidikan, PendidikanCreateDTO } from "../models/pendidikan";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const findAllPendidikan = async (): Promise<Pendidikan[]> => {
  const query = "SELECT * FROM pendidikan ORDER BY created_at DESC";
  const [rows] = await pool.query<RowDataPacket[]>(query);
  return rows as Pendidikan[];
};

export const createPendidikan = async (
  data: PendidikanCreateDTO & { file_bukti?: string | null }
): Promise<Pendidikan> => {
  const query = `
      INSERT INTO pendidikan (tahun_ajaran, semester, mata_kuliah, kelas, sks, status, file_path)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  const statusAwal = data.file_bukti ? "SUDAH_UPLOAD" : "BELUM_UPLOAD";

  const values = [
    data.tahun_ajaran,
    data.semester,
    data.mata_kuliah,
    data.kelas,
    data.sks,
    statusAwal,
    data.file_bukti || null,
  ];

  const [result] = await pool.query<ResultSetHeader>(query, values);

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM pendidikan WHERE id = ?",
    [result.insertId]
  );

  return rows[0] as Pendidikan;
};

// Fungsi BARU: Query Update File ke Database
export const updateFilePendidikan = async (
  id: number,
  filename: string
): Promise<Pendidikan | null> => {
  const query = `
        UPDATE pendidikan 
        SET file_path = ?, status = 'SUDAH_UPLOAD' 
        WHERE id = ?
    `;

  await pool.query<ResultSetHeader>(query, [filename, id]);

  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM pendidikan WHERE id = ?",
    [id]
  );

  return rows.length > 0 ? (rows[0] as Pendidikan) : null;
};
