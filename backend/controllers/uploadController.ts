import { Request, Response } from 'express';
import { processUpload, handleImageUpload } from '../uploadService';
import multer from 'multer';

interface MulterRequest extends Request {
  file: any;
}

const upload = multer({ dest: 'uploads/' });

export const uploadPatientData = [
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {
      const multerReq = req as MulterRequest;
      if (!multerReq.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      await processUpload(multerReq.file, 'patient');
      res.json({ message: 'Patient data uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Upload failed' });
    }
  }
];

export const uploadEquipmentData = [
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {
      const multerReq = req as MulterRequest;
      if (!multerReq.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      await processUpload(multerReq.file, 'equipment');
      res.json({ message: 'Equipment data uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Upload failed' });
    }
  }
];

export const uploadStaffData = [
  upload.single('file'),
  async (req: Request, res: Response) => {
    try {
      const multerReq = req as MulterRequest;
      if (!multerReq.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      await processUpload(multerReq.file, 'staff');
      res.json({ message: 'Staff schedule uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Upload failed' });
    }
  }
];

export const uploadImage = [
  upload.single('image'),
  async (req: Request, res: Response) => {
    try {
      const multerReq = req as MulterRequest;
      if (!multerReq.file) {
        return res.status(400).json({ error: 'No image uploaded' });
      }
      
      const result = handleImageUpload(multerReq.file);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Image upload failed' });
    }
  }
];