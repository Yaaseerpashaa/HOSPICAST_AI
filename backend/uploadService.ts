import fs from 'fs';
import csv from 'csv-parser';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import { Express } from 'express';
import path from 'path';

interface PatientData {
  patient_id: string;
  department: string;
  diagnosis: string;
  admit_time: string;
  age: number;
  severity: string;
}

interface EquipmentLog {
  equipment_id: string;
  type: string;
  usage_start: string;
  usage_end: string;
  patient_id: string;
}

interface StaffSchedule {
  staff_id: string;
  name: string;
  role: string;
  shift_start: string;
  shift_end: string;
  department: string;
}

const validateData = (data: any, fileType: 'patient' | 'equipment' | 'staff' | 'file'): boolean => {
  if (fileType === 'file') return true;
  
  const requiredFields = {
    patient: ['patient_id', 'department', 'diagnosis', 'admit_time', 'age', 'severity'],
    equipment: ['equipment_id', 'type', 'usage_start', 'usage_end', 'patient_id'],
    staff: ['staff_id', 'name', 'role', 'shift_start', 'shift_end', 'department']
  };
  
  const fields = requiredFields[fileType];
  return fields.every(field => field in data);
};

export const processUpload = async (file: Express.Multer.File, fileType: 'patient' | 'equipment' | 'staff' | 'file') => {
  if (fileType === 'file') {
    return handleFileUpload(file);
  }

  const results: any[] = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (data) => {
        if (validateData(data, fileType)) {
          results.push(data);
        } else {
          reject(new Error(`Invalid data format for ${fileType} file`));
        }
      })
      .on('end', () => {
        try {
          const processedData = results.map(item => ({
            ...item,
            id: uuidv4(),
            timestamp: new Date().toISOString()
          }));
          
          const filePath = `backend/data/${fileType}_data.csv`;
          
          if (!fs.existsSync('backend/data')) {
            fs.mkdirSync('backend/data', { recursive: true });
          }
          
          if (!fs.existsSync(filePath)) {
            const headers = Object.keys(processedData[0]).join(',') + '\n';
            fs.writeFileSync(filePath, headers);
          }
          
          fs.appendFileSync(
            filePath,
            processedData.map(d => Object.values(d).join(',')).join('\n')
          );
          
          fs.unlinkSync(file.path);
          
          resolve({
            message: `${fileType} data uploaded successfully`,
            count: processedData.length
          });
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => reject(error));
  });
};

export const handleFileUpload = (file: Express.Multer.File) => {
  const fileId = uuidv4();
  const extension = path.extname(file.originalname);
  const newPath = `uploads/files/${fileId}${extension}`;
  
  if (!fs.existsSync('uploads/files')) {
    fs.mkdirSync('uploads/files', { recursive: true });
  }
  
  fs.renameSync(file.path, newPath);
  
  return {
    fileId,
    originalName: file.originalname,
    path: newPath,
    size: file.size,
    mimetype: file.mimetype,
    timestamp: new Date().toISOString()
  };
};

export const handleImageUpload = (file: Express.Multer.File) => {
  const imageId = uuidv4();
  const extension = path.extname(file.originalname);
  const newPath = `uploads/images/${imageId}${extension}`;
  
  if (!fs.existsSync('uploads/images')) {
    fs.mkdirSync('uploads/images', { recursive: true });
  }
  
  fs.renameSync(file.path, newPath);
  
  return {
    imageId,
    originalName: file.originalname,
    path: newPath,
    size: file.size,
    mimetype: file.mimetype,
    timestamp: new Date().toISOString()
  };
};