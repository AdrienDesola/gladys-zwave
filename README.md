# Gladys Zwave

Gladys hooks to control Zwave devices.

Need Gladys version >= 3.1.11 and open-zwave installed on the machine running Gladys.

Open-Zwave is already installed in the prebuilt Gladys Raspbian image you can download [here](https://sourceforge.net/projects/gladys/files/latest/download).

If you want to use it on your Raspbian image 3.1.5, all you have to do is to :
- Install Open Zwave on it (Instructions are at the end of this README)
- Update Gladys to version >= 3.1.11

## Documentation

### Installation

- Plug your Zwave USB stick on your Raspberry Pi
- Find the name of the USB port the stick is connected to (it looks like `/dev/ttyACM0`). 
You can try to execute `ls /dev/tty*` before and after pluggging the USB stick to find which port it is.
- Create a parameter in Gladys by going to "Parameters" => "Parameters", and create a key-value store : 
key = "zwave_usb_port", value = "THE_USB_PORT_NAME_YOU_FOUND"
- Install the module in Gladys by going to "Modules" => "Advanced", enter : 
name : `Zwave`, version: `0.0.1`, git URL : `https://github.com/GladysProject/gladys-zwave.git`, slug: `zwave`
- Reboot Gladys

### Usage

Now, all your Zwave devices should appears in the "Devices" view.

To add other Zwave devices and switch to inclusion mode, go to "Modules" 
and click on the "Configuration" button on the Zwave module row. 

To leave this module, click again on "Configuration".

## Install Open Zwave manually Raspberry Pi

Simply execute the following commands : 

```
wget https://github.com/ekarak/openzwave-debs-raspbian/raw/master/v1.4.79/libopenzwave1.3_1.4.79.gfaea7dd_armhf.deb
wget https://github.com/ekarak/openzwave-debs-raspbian/raw/master/v1.4.79/libopenzwave1.3-dev_1.4.79.gfaea7dd_armhf.deb

sudo dpkg -i libopenzwave*.deb
```

