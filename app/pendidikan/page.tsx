// app/pendidikan/page.tsx

'use client';

import React, { useState } from 'react';

// Tipe data untuk input mata kuliah
interface MataKuliah {
    id: number;
    tahunAkademik: string;
    semester: string;
    namaMatkul: string;
    kelas: string;
    sks: number;
    statusBukti: 'Belum Upload' | 'Sudah Upload';
}

const initialData: MataKuliah[] = [
    { id: 1, tahunAkademik: '2024/2025', semester: 'Ganjil', namaMatkul: 'Interaksi Manusia & Komputer', kelas: 'A', sks: 3, statusBukti: 'Belum Upload' },
    { id: 2, tahunAkademik: '2024/2025', semester: 'Ganjil', namaMatkul: 'Pemrograman Web', kelas: 'B', sks: 4, statusBukti: 'Sudah Upload' },
];

export default function PendidikanPage() {
    const [data, setData] = useState<MataKuliah[]>(initialData);
    const [formData, setFormData] = useState({
        tahunAkademik: '', semester: '', namaMatkul: '', kelas: '', sks: 0
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newEntry: MataKuliah = {
            id: Date.now(),
            ...formData,
            sks: Number(formData.sks),
            statusBukti: 'Belum Upload',
        };
        setData([...data, newEntry]);
        // Reset form
        setFormData({ tahunAkademik: '', semester: '', namaMatkul: '', kelas: '', sks: 0 });
    };

    const handleUpload = (id: number) => {
        // Logika unggah file (hanya simulasi)
        alert(`Membuka dialog unggah untuk ID: ${id}.`);
        // Mengubah status bukti fisik (simulasi)
        setData(data.map(item =>
            item.id === id ? { ...item, statusBukti: 'Sudah Upload' } : item
        ));
    };

    return (
        <div className="space-y-10">
            <h1 className="text-3xl font-bold text-gray-800 border-b pb-4">
                E-Filling Bidang Pendidikan
            </h1>

            {/* Form Input Bidang Pendidikan */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Input Data Mata Kuliah</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Tahun Akademik</label>
                        <select
                            name="tahunAkademik"
                            value={formData.tahunAkademik}
                            onChange={(e) => setFormData({ ...formData, tahunAkademik: e.target.value })}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        >
                            <option value="">Pilih Tahun</option>
                            <option value="2024/2025">2024/2025</option>
                            <option value="2023/2024">2023/2024</option>
                        </select>
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Semester</label>
                        <select
                            name="semester"
                            value={formData.semester}
                            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        >
                            <option value="">Pilih Semester</option>
                            <option value="Ganjil">Ganjil</option>
                            <option value="Genap">Genap</option>
                        </select>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Nama Mata Kuliah</label>
                        <input
                            type="text"
                            name="namaMatkul"
                            value={formData.namaMatkul}
                            onChange={(e) => setFormData({ ...formData, namaMatkul: e.target.value })}
                            required
                            placeholder="Contoh: Interaksi Manusia & Komputer"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Kelas</label>
                        <input
                            type="text"
                            name="kelas"
                            value={formData.kelas}
                            onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                            required
                            placeholder="Contoh: A"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        />
                    </div>

                    <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700">Jumlah SKS</label>
                        <input
                            type="number"
                            name="sks"
                            value={formData.sks || ''}
                            onChange={(e) => setFormData({ ...formData, sks: Number(e.target.value) })}
                            required
                            min="1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        />
                    </div>

                    <div className="col-span-2 pt-2">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        >
                            Simpan Data Pendidikan
                        </button>
                    </div>
                </form>
            </div>

            {/* Tabel Data Mata Kuliah yang Sudah Diinput */}
            <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Daftar Mata Kuliah Diampu</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun/Semester</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mata Kuliah</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas/SKS</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Bukti</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {item.tahunAkademik} ({item.semester})
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {item.namaMatkul}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {item.kelas} / {item.sks} SKS
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.statusBukti === 'Sudah Upload' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {item.statusBukti}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <button
                                        onClick={() => handleUpload(item.id)}
                                        className="text-indigo-600 hover:text-indigo-900"
                                        title="Unggah SK Mengajar/Nilai"
                                    >
                                        Upload
                                    </button>
                                    <button
                                        className="text-blue-600 hover:text-blue-900"
                                        title="Ubah Detail Data"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-900"
                                        title="Hapus Data"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Catatan: Draft Upload Bukti Fisik diintegrasikan ke dalam tombol 'Upload' pada tabel di atas. */}
        </div>
    );
}   