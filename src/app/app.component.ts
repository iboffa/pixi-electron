import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Application, Graphics, TextStyle, Texture, TilingSprite, Text } from 'pixi.js';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container!: ElementRef;
  pixiApp: Application = new Application({
    width: 640,
    height: 480
  });
  timeText: Text = new Text('45:00');;

  ngAfterViewInit() {
    this.container.nativeElement.appendChild(this.pixiApp.view);
  }

  ngOnInit(): void {
    from(navigator.mediaDevices.getUserMedia({ video: true })).subscribe((stream) => {
      const video = document.createElement('video');
      video.srcObject = stream;
      const texture = Texture.from(video);
      const tilingSprite = new TilingSprite(texture, this.pixiApp.screen.width, this.pixiApp.screen.height);
      this.pixiApp.stage.addChild(tilingSprite);

      // Create the text objects
      this.timeText = new Text('45:00');
      this.timeText.x = 15;
      this.timeText.y = 15;

      // Set the font, style, and color for each text object
      this.timeText.style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 16,
        fill: '#FFFFFF'
      });

      // Create the background rectangles
      let timeRect = new Graphics();
      timeRect.beginFill(0xCCCCCC);
      timeRect.drawRect(this.timeText.x - 5, this.timeText.y - 5, this.timeText.width + 10, this.timeText.height + 10);
      timeRect.endFill();



      // Add the text and rectangle objects to the PixiJS stage
      this.pixiApp.stage.addChild(timeRect);
      this.pixiApp.stage.addChild(this.timeText);

    })
  }

}
