import { Component } from '@angular/core';

interface ProjectStep {
  title: string;
  description: string;
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
        'Sign up quickly to get started. Your profile helps you save and manage all your birthday reminders in one place.',
        imgUrl: 'assets/how-it-works/Presentation1.png',
        alt: 'step',
    },
    {
      title: 'Create birthday reminders',
      description:
        'Add important birthdays for friends, family, and colleagues so you never miss a special day again.',
        imgUrl: 'assets/how-it-works/Presentation2.png',
        alt: 'step',
    },
    {
      title: 'Group your reminders',
      description:
        'Organize birthdays into custom groups like Family, Friends, or Work to keep everything neat and easy to find.',
        imgUrl: 'assets/how-it-works/Presentation3.png',
        alt: 'step',
    },
    {
      title: 'You can optionally archive reminders',
      description:
        'Clean up your dashboard by archiving old or inactive reminders—without permanently deleting them.',
        imgUrl: 'assets/how-it-works/Presentation4.png',
        alt: 'step',
    },
    {
      title: 'Celebrate 🎉',
      description:
        'Get notified right on time, send your wishes, and make someone\'s day unforgettable!',
        imgUrl: 'assets/how-it-works/Presentation5.png',
        alt: 'step',
    },
  ];
  public selectedStepIndex: number = 0;
  public selectedStep: ProjectStep = this.steps[0];

  constructor() {}

  selectStep(index: number): void {
    this.selectedStepIndex = index;
    this.selectedStep = this.steps[index];
  }
}
