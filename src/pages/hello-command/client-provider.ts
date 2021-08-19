import {
    ICommand,
    LightReceiver,
    LightOnCommand,
    LightOffCommand, 
    RedLightOnCommand,
    RedLightUpCommand, 
    RedLightDownCommand,  
    RemoteControlInvoker
} from  '../../patterns/command/command-remote'


let control: RemoteControlInvoker = new RemoteControlInvoker();
let light: LightReceiver = new LightReceiver();
let lightOn: ICommand = new LightOnCommand(light);
let lightOff: ICommand = new LightOffCommand(light);
let redLightOn: ICommand = new RedLightOnCommand(light);
let redLightUp: ICommand = new RedLightUpCommand(light);
let redLightDown: ICommand = new RedLightDownCommand(light);

// client controls the light here
export function remoteControlLight(remote: string){

    if(remote === 'on'){
        control.setCommand(lightOn);  // sets the light on command
    }
    if(remote === 'off'){
        control.setCommand(lightOff);  // sets the light on command
    }
    if(remote === 'onRedLight'){
        control.setCommand(new RedLightOnCommand(light));  // sets the red light on command
    }
    if(remote === 'up'){
        control.setCommand(new RedLightUpCommand(light));  // sets the command to increase luminosity
    }
    if(remote === 'down'){
        control.setCommand(new RedLightDownCommand(light));  // sets the command to decrease luminosity
    }

    return control.pressButton()  // finally the button is pressed and command is performed
}