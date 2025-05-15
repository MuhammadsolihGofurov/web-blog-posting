import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as qs from 'qs'; // ← qo‘shildi

@Injectable()
export class ImageUploadService {
  private readonly apiKey = 'e7c744b30da049109b7bce4365417512';

  async uploadImage(filePath: string): Promise<any> {
    const imageBuffer = fs.readFileSync(filePath);
    const base64Image = imageBuffer.toString('base64');

    const params = new URLSearchParams();
    params.append('image', base64Image);

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${this.apiKey}`,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return {
      image: response?.data?.data?.image,
      thumb: response?.data?.data?.thumb,
      delete_url: response?.data?.data?.delete_url,
    };
  }
}
