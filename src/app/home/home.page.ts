import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  videoPath: string="";

  async shareVideo() {
    if (Capacitor.getPlatform()=='web') {
      // Get the video path from your application logic, e.g., user selection or local storage
      if (!this.videoPath) {
        console.error('No video path provided!');
        return;
      }

      // Read the video file data
      const videoData = await Filesystem.readFile({ path: this.videoPath });

      // Share the video data
      await Share.share({
        url: `data:video/mp4;base64,${videoData.data}`,
        title: 'Share this video!',
      });
    } else {
      console.warn('Sharing video is not supported on web platform.');
    }
  }
  }

