import { Component } from '@angular/core';

interface ProjectStep {
  title: string;
  description: string;
}

interface StepImg {
  imgUrl: string;
  alt: string;
}

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
})
export class HowItWorksComponent {
  public steps: ProjectStep[] = [
    {
      title: 'Create your profile',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue a ex nec mollis. Phasellus rhoncus massa ut fringilla hendrerit. Vivamus pulvinar convallis nibh.',
    },
    {
      title: 'Create birthday reminders',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue a ex nec mollis. Phasellus rhoncus massa ut fringilla hendrerit. Vivamus pulvinar convallis nibh.',
    },
    {
      title: 'Group your reminders',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue a ex nec mollis. Phasellus rhoncus massa ut fringilla hendrerit. Vivamus pulvinar convallis nibh.',
    },
    {
      title: 'You can optionally archive reminders',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue a ex nec mollis. Phasellus rhoncus massa ut fringilla hendrerit. Vivamus pulvinar convallis nibh.',
    },
    {
      title: 'Celebrate 🎉',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum congue a ex nec mollis. Phasellus rhoncus massa ut fringilla hendrerit. Vivamus pulvinar convallis nibh.',
    },
  ];
  public imgs: StepImg[] = [
    {
      imgUrl: 'assets/how-it-works/Presentation1.png',
      alt: 'step',
    },
    {
      imgUrl: 'assets/how-it-works/Presentation2.png',
      alt: 'step',
    },
    {
      imgUrl: 'assets/how-it-works/Presentation3.png',
      alt: 'step',
    },
    {
      imgUrl: 'assets/how-it-works/Presentation4.png',
      alt: 'step',
    },
    {
      imgUrl: 'assets/how-it-works/Presentation5.png',
      alt: 'step',
    },
  ];
  public selectedStep: number = 0;
  public selectedImg: StepImg = this.imgs[0];

  constructor() {}

  selectStep(index: number): void {
    this.selectedStep = index;
    this.selectedImg = this.imgs[index];
  }
}
