import { Component } from '@angular/core';
import JSZip from 'jszip';

@Component({
  selector: 'app-file-extractor',
  templateUrl: './file-extractor.component.html',
  styleUrls: ['./file-extractor.component.css'],
})
export class FileExtractorComponent {
  selectedFile: File | null = null;
  extractedFiles: Array<{ name: string }> = [];

  // Method to handle file selection
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/zip') {
      this.selectedFile = file;
    } else {
      alert('Please select a valid zip file.');
    }
  }

  // Method to extract files from the selected ZIP file
  extractFile(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        JSZip.loadAsync(event.target.result).then(zip => {
          this.extractedFiles = []; // Clear previous results
          const promises = Object.keys(zip.files).map(fileName => {
            return zip.files[fileName].async('blob').then(blob => {
              this.extractedFiles.push({ name: fileName });
              const fileUrl = URL.createObjectURL(blob);
              // Optionally, you could trigger a download here
              // saveAs(blob, fileName);
            });
          });

          Promise.all(promises).then(() => {
            console.log('All files extracted');
          });
        });
      };
      reader.readAsArrayBuffer(this.selectedFile);
    }
  }
}