import { BadRequestException, Injectable } from "@nestjs/common";
import StorageFile from "./dto/storage-file.dto";
import { DownloadResponse, Storage } from "@google-cloud/storage";
import { ConfigService } from "@nestjs/config";
import { parse } from "path";
@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.storage = new Storage({
      projectId: this.configService.get("GOOGLE_CLOUD_PROJECT_ID"),
      credentials: {
        client_email: this.configService.get("GOOGLE_CLOUD_CLIENT_EMAIL"),
        private_key: this.configService.get("GOOGLE_CLOUD_PRIVATE_KEY"),
        // private_key:
        //   "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3GLI5xW80Qg8O\nZ4G5LfSSuBYAYBDDKrZjO124VMb+VQN/7ABQXgFqpdMw4Y7Bl7Ri+JmF/FBBFjIT\n7aKdQdOmVIPYH3CQF3klme6vM0FFHXdPLRVAWG9VRR1iCpOLAyV2zfGvEXwbvu3s\nhIh2KL0QibyP/wrVk97+vpNWSgxuQLQepozXDmamGdWqniCTZoyduMKBYrhSzAFE\nRUNheQ4ypjCHHVCLAqRpwyUcOg4RYpmNwkSOKv6U861bubsvMrzwsI0YXa/0zWP8\nmtrqWe7/c0XuWBUZpe08d10qG0XwCFSlFh5uIDanUDISFqehVFHxLIULPPJIoh0y\nuuBJkGwZAgMBAAECggEATDaP7UM09EQw/zZvhXTPEolkwxg5sftj+u85piJHyJL7\nh3JleQ6AOXO38mdZJFUw5WeEhASQJV+HTctDPoEph9kzHjGMCbZzm4a1FyFXIF1R\nDdh+uY92HEDOJ8KuQpV3MTotSUmWZvg1Ehfis4hmlm0225t2V4ubLV+HdcoR3YwE\n3uqf8uZwUqyqEWWlZsVv3x6UgWayG4db7imv3sBuhrLdLNt5IG5IubkdKINdeKtl\n/B2fG1nZA2NYlMlQBE10WmKNeOUOvym5ICdsLTZJroUQCgOIyEf9WDA11Zxmmci1\nqsR8jY9oBbdpMLTs3IULdsr7E8F9mz38bbxaWcN6pwKBgQDy5wBo8hAwcLMmoq1Y\nJoMjyy+QmaYFrl3I3NJXZc39QfGi+y/iNgCoV0MgekPFP2yxBXKXDgW/qXaYmu1F\nEkS2n3Vsk0gstQS3m9T8/jXZMHsgcIa5mW8XIxPeKnW3FHflpi57gyHyMyIGs99g\nnM6TZf1pEvA0iUu+ERxMART2XwKBgQDA+CP53dRBya2tuw/joZ2gTogXUwMi9hkZ\nn46HvEiZMeUE/jfIgc4CDzUqQNaxNhCEI4ImOI646Mq7Z1Mg4iWFradKz5TQiCMs\nVagewLq206PzGzOqOk7Hfteag+JF0B35KVlHF35/tvqK19mUMLWfk6/OqNeKoPWc\n4NAyto2AhwKBgQDso32zv/djqbfu8NcdpM9nxKA/KGEk8b1uXSsSeBzZGTB2jm4U\n3HWBixnbfyGc/XA/eUYswT16fncKrwxumSCWJf043LeYznWdBtTV8Da3s9KQRPAL\nyt3+VW8appTt2qP/+AkazSL6GTSSARSiw8FAukDJ5+hZ1lQTBApkRT2N0wKBgAHu\nee22WrmN2z8x8CbHJ1zDbHlPS2i+LeIjxrl1GQTviutR4B0Rr441uMKDg6Kid+fa\nsyLOzh7rtZvKnPpnSRjddB87lLHBqxh2gwhLxZKu66UzUIETtFYq3t2dFFa+jo4/\n67Tad1mv6zIYlwT0t9yxDcFzzzSEB/FaDrtzOFdhAoGBAMLQ9VBRyWFZ8vfw5X1K\nlGQ49BFAWY9gwUY5Hqki75xQW+l+/ZF+650460sE3wXmOhDLHFOWFQlN0FoBUOKu\npOGgPbyQOhWmEnOUEUsHMGT1KJo5ATYUWc5hh6IsGxSzuTHMGTBuKDs96ecCT90V\nXnFri3omwdkN31qCElcDjqit\n-----END PRIVATE KEY-----\n",
      },
    });
    this.bucket = this.configService.get("BUCKET_NAME");
  }
  private setDestination(destination: string): string {
    let escDestination = "";
    escDestination += destination.replace(/^\.+/g, "").replace(/^\/+|\/+$/g, "");
    if (escDestination !== "") escDestination = escDestination + "/";
    return escDestination;
  }

  private setFilename(uploadedFile: any): string {
    const fileName = parse(uploadedFile.originalname);
    return `${fileName.name}-${Date.now()}${fileName.ext}`.replace(/^\.+/g, "").replace(/^\/+/g, "").replace(/\r|\n/g, "_");
  }

  async save(path: string, contentType: string, media: Buffer, metadata: { [key: string]: string }[]) {
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(this.bucket).file(path);
    const stream = file.createWriteStream();
    stream.on("finish", async () => {
      return await file.setMetadata({
        metadata: object,
      });
    });
    stream.end(media);
  }
  async uploadFile(uploadFile: any, destination: string): Promise<any> {
    const fileName = this.setDestination(destination) + this.setFilename(uploadFile);
    const file = this.storage.bucket(this.bucket).file(fileName);

    try {
      await file.save(uploadFile.buffer, { contentType: uploadFile.mimetype });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
    return {
      ...file.metadata,
      publicUrl: `https://storage.googleapis.com/${this.storage.bucket(this.bucket).name}/${file.name}`,
    };
  }
  async deleteFile(nameFile: string) {
    const file = await this.storage.bucket(this.bucket).file(nameFile).delete({ ignoreNotFound: true });
    return true;
  }
}
