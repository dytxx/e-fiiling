export interface Pendidikan {
  id: number;
  tahun_ajaran: number;
  semester: string;
  mata_kuliah: string;
  kelas: string;
  sks: number;
  status: string;
  file_path?: string | null; // Tambahkan ini
  created_at: Date;
  updated_at: Date;
}

export interface PendidikanCreateDTO {
  tahun_ajaran: number;
  semester: string;
  mata_kuliah: string;
  kelas: string;
  sks: number;
  file_bukti?: string | null; // Tambahkan ini untuk menampung nama file dari controller
}

export class PendidikanItemDTO {
  constructor(
    public id: number,
    public tahun_semester: string,
    public mata_kuliah: string,
    public kelas_sks: string,
    public status: string,
    public file_path?: string | null // Tambahkan ini agar frontend bisa tau link downloadnya
  ) {}
}
