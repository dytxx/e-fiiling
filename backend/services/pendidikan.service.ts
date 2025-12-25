import {
  findAllPendidikan,
  createPendidikan as createPendidikanRepo,
  updateFilePendidikan,
} from "../repositories/pendidikan.repository";
import {
  PendidikanItemDTO,
  PendidikanCreateDTO,
  Pendidikan,
} from "../models/pendidikan";

// 1. Service untuk Mengambil Semua Data & Memformatnya
export const getAllPendidikanService = async (): Promise<
  PendidikanItemDTO[]
> => {
  const result = await findAllPendidikan();

  // Transformasi data mentah dari database ke format DTO untuk frontend
  return result.map((pendidikan) => {
    // Contoh format: "2024/2025 GANJIL"
    const tahunSemester = `${pendidikan.tahun_ajaran}/${
      pendidikan.tahun_ajaran + 1
    } ${pendidikan.semester}`;
    // Contoh format: "Kelas A / 3 SKS"
    const kelasSks = `Kelas ${pendidikan.kelas} / ${pendidikan.sks} SKS`;

    return new PendidikanItemDTO(
      pendidikan.id,
      tahunSemester,
      pendidikan.mata_kuliah,
      kelasSks,
      pendidikan.status,
      pendidikan.file_path // Pastikan field ini ada di DTO dan Model
    );
  });
};

// 2. Service untuk Membuat Data Baru
export const createPendidikanService = async (
  data: PendidikanCreateDTO
): Promise<Pendidikan> => {
  // Di sini bisa ditambahkan logika validasi bisnis tambahan jika perlu
  return await createPendidikanRepo(data);
};

// 3. Service untuk Update File (Upload Susulan)
export const updatePendidikanFileService = async (
  id: number,
  filename: string
): Promise<Pendidikan | null> => {
  // Panggil repository untuk update kolom file_path dan status
  return await updateFilePendidikan(id, filename);
};
