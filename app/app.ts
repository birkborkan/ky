import { Application } from '@nativescript/core';
import { ZaghawaKeyboardService } from './keyboard/keyboard.service';

Application.android.on(Application.android.activityCreatedEvent, (args) => {
    const activity = args.activity;
    const context = activity.getApplicationContext();
    
    // Register the keyboard service
    const keyboardService = new ZaghawaKeyboardService();
    keyboardService.init(context);
});