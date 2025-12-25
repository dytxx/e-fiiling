import { Request, Response, NextFunction } from "express";
import {
  getAllPendidikanService,
  createPendidikanService,
  updatePendidikanFileService,
} from "../services/pendidikan.service";
import fs from "fs";
import path from "path";

// 1. Ambil Semua Data
export const getAllPendidikan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAllPendidikanService();
    res.json({
      status: "success",
      data: data,
    });
  } catch (error: any) {
    console.error("❌ Error getAllPendidikan:", error);
    res.status(500).json({
      status: "error",
      message: error.message || "Internal Server Error",
    });
  }
};

// 2. Buat Data Baru
export const createPendidikan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.mata_kuliah || !req.body.sks) {
      // Jika validasi gagal tapi file sudah terlanjur diupload multer, hapus filenya
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(400).json({
        status: "error",
        message: "Data mata kuliah dan SKS wajib diisi.",
      });
      return;
    }

    const pendidikanData = {
      tahun_ajaran: Number(req.body.tahun_ajaran),
      semester: req.body.semester,
      mata_kuliah: req.body.mata_kuliah,
      kelas: req.body.kelas,
      sks: Number(req.body.sks),
      file_bukti: req.file ? req.file.filename : null,
    };

    const data = await createPendidikanService(pendidikanData);

    res.status(201).json({
      status: "success",
      data: data,
      file_uploaded: req.file ? req.file.filename : "Tidak ada file",
    });
  } catch (error: any) {
    console.error("❌ Error createPendidikan:", error);
    res
      .status(500)
      .json({ status: "error", message: error.sqlMessage || error.message });
  }
};

// 3. Update File (Debug Mode)
export const updatePendidikan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    console.log(`📥 Request Update ID: ${id}`);
    console.log("📂 File yang diterima:", req.file);

    if (!req.file) {
      res.status(400).json({
        status: "error",
        message:
          "Tidak ada file yang diupload. Pastikan field name di FormData adalah 'file_bukti'",
      });
      return;
    }

    // Verifikasi apakah file benar-benar ada di disk
    if (!fs.existsSync(req.file.path)) {
      console.error(`❌ File fisik tidak ditemukan di: ${req.file.path}`);
      res
        .status(500)
        .json({ status: "error", message: "File gagal disimpan ke server." });
      return;
    }

    // Panggil service
    const updatedData = await updatePendidikanFileService(
      id,
      req.file.filename
    );

    if (!updatedData) {
      console.error(`❌ Data dengan ID ${id} tidak ditemukan di database.`);
      // Hapus file jika database update gagal (supaya tidak nyampah)
      fs.unlinkSync(req.file.path);
      res.status(404).json({
        status: "error",
        message: "Data tidak ditemukan di database.",
      });
      return;
    }

    console.log("✅ Update Berhasil:", updatedData);
    res.json({
      status: "success",
      data: updatedData,
      message: "File berhasil diupdate",
    });
  } catch (error: any) {
    console.error("❌ CRITICAL ERROR di updatePendidikan:", error);
    res.status(500).json({
      status: "error",
      message: error.sqlMessage || error.message || "Unknown Server Error",
      stack: error.stack,
    });
  }
};
