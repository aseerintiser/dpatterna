// Command
export interface ICommand {
    execute(): void  // any command is invoked through this method
}


// Concrete Command
export class LightOnCommand implements ICommand {

    // reference to the light
    light: LightReceiver;

    public constructor (light: LightReceiver) {
        this.light = light;  // gets a light to control
    }

    public execute() {
        return this.light.switchOn()  // turns the light on
    }

}

// Concrete Command
export class LightOffCommand implements ICommand {

    // reference to the light
    light: LightReceiver;

    public constructor (light: LightReceiver) {
        this.light = light;  // gets a light to control
    }

    public execute() {
        return this.light.switchOff()  // turns the light off
    }

}

// Concrete Command
export class RedLightOnCommand implements ICommand {

    light: LightReceiver;
    isLightOn: boolean;

    public constructor (light: LightReceiver) {
        this.light = light;
        this.isLightOn = light.getCurrentLightStatus();  // checks the light status, if it is on or off
    }
    public execute() {
        if(this.isLightOn) {
            return this.light.switchRedLow();
        } else {
            return this.light.switchOff();
        }
    }
}

// Concrete Command
export class RedLightUpCommand implements ICommand {

    light: LightReceiver;
    current_luminosity: number;
    isRedLightOn: boolean;
    isLightOn: boolean;

    public constructor (light: LightReceiver) {
        this.light = light;
        this.current_luminosity = light.getCurrentLuminosity();  // checks the red light current luminosity
        this.isRedLightOn = light.getCurrentRedLightStatus();  // checks the red light status, if it is on or off
        this.isLightOn = light.getCurrentLightStatus();  // checks the light status, if it is on or off
    }
    public execute() {
        if(!this.isLightOn) {
            return this.light.switchOff();  // if the light is not on, we return off, and don't go on the next conditions
        }
        else if(!this.isRedLightOn) {
            return this.light.switchOn();  // we only go to next condition if the red light is on
        }
        else if(this.current_luminosity === this.light.RED_VERYLOW) {
           return this.light.switchRedLow();  // if luminosity is very low, we increase it to low
        }
        else if(this.current_luminosity === this.light.RED_LOW) {
           return this.light.switchRedMedium();  // if luminosity is low, we increase it to medium
        }
        else if(this.current_luminosity === this.light.RED_MEDIUM) {
           return this.light.switchRedHigh();  // if luminosity is medium, we increase it to high
        }
        else if(this.current_luminosity === this.light.RED_HIGH) {
           return this.light.switchRedHigh();  // if luminosity is high, we keep it high
        }
    }
}

// Concrete Command
export class RedLightDownCommand implements ICommand {

    light: LightReceiver;
    current_luminosity: number;
    isRedLightOn: boolean;
    isLightOn: boolean;

    public constructor (light: LightReceiver) {
        this.light = light;
        this.current_luminosity = light.getCurrentLuminosity();  // checks the red light current luminosity
        this.isRedLightOn = light.getCurrentRedLightStatus();  // checks the red light status, if it is on or off
        this.isLightOn = light.getCurrentLightStatus();  // checks the light status, if it is on or off
    }
    public execute() {
        if(!this.isLightOn) {
            return this.light.switchOff();  // if the light is not on, we return off, and don't go on the next conditions
        }
        else if(!this.isRedLightOn) {
            return this.light.switchOn();  // we only go to next condition if the red light is on
        }
        else if(this.current_luminosity === this.light.RED_HIGH) {
           return this.light.switchRedMedium();  // if luminosity is high, we decrease it to medium
        }
        else if(this.current_luminosity === this.light.RED_MEDIUM) {
           return this.light.switchRedLow();  // if luminosity is medium, we decrease it to low
        }
        else if(this.current_luminosity === this.light.RED_LOW) {
           return this.light.switchRedVeryLow();  // if luminosity is low, we decrease it to very low
        }
        else if(this.current_luminosity === this.light.RED_VERYLOW) {
           return this.light.switchRedVeryLow();  // if luminosity is very low, we keep it very low
        }
    }
}


// Receiver
export class LightReceiver {

    public RED_HIGH: number = 3;  // high luminosity
    public RED_MEDIUM: number = 2;  // medium luminosity
    public RED_LOW: number = 1;  // low luminosity
    public RED_VERYLOW: number = 0;  // very low luminosity

    luminosity: number;
    isLightOn: boolean;  // checks if the light is on
    isRedLightOn: boolean;  // checks if the red light is on

    constructor() {
        this.luminosity = this.RED_VERYLOW;  // luminosity is very low at first
        this.isRedLightOn = false;  // red light is off at first
        this.isLightOn = false;  // light is off at first
    }

    // turns on the light
    public switchOn() {
        this.isLightOn = true;  // switch the light on
        this.isRedLightOn = false;  // but red light is kept off
        return "on";  // returns the "on" image
    }

    // turns off the light
    public switchOff() {
        this.isLightOn = false;  // switch the light off
        this.isRedLightOn = false;  // also red light is kept off
        return "off";  // returns the "off" image
    }

    // for light with very low luminosity
    public switchRedVeryLow() {
        this.luminosity = this.RED_VERYLOW;  // sets luminosity to very low
        return 'red0';  // returns the "red0" image
    }

    // for light with low luminosity
    public switchRedLow() {
        this.luminosity = this.RED_LOW;  // sets luminosity to low
        this.isRedLightOn = true;  // red light is on from now
        return "red1";  // returns the "red1" image
    }

    // for light with medium luminosity
    public switchRedMedium() {
        this.luminosity = this.RED_MEDIUM;  // sets luminosity to medium
        return "red2";  // returns the "red2" image
    }

    // for light with high luminosity
    public switchRedHigh() {
        this.luminosity = this.RED_HIGH;  // sets luminosity to high
        return "red3";  // returns the "red3" image
    }

    public getCurrentLuminosity() {
        return this.luminosity;  // returns the current luminosity status
    }

    public getCurrentLightStatus() {
        return this.isLightOn;  // returns the lightstatus, if it is on or off
    }

    public getCurrentRedLightStatus() {
        return this.isRedLightOn;  // returns the red light status, if it is on or off
    }

}


// Invoker
export class RemoteControlInvoker {
    
    private command!: ICommand;

    public setCommand(command: ICommand) {
        this.command = command  // we set the remote command that the client pressed
    }

    public pressButton() {
        return this.command.execute()  // we execute the remote command that the client pressed
    }

}