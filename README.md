# NMMES-cli
---

The NMMES command line interface frontend of the NMMES-backend. Use it to encode large libraries of videos to another format.

* [Beginner's Guide](https://github.com/NMMES/nmmes-cli/wiki/Beginner's-Guide)
* [Installation](#installation)
* [Version](#version)
* [Usage](#usage)
  * [Basic](#basic)
  * [Options](#options)
  * [Modules List](https://www.npmjs.com/search?q=nmmes-module)
  * [Wiki](https://github.com/NMMES/nmmes-cli/wiki)

## Installation

NMMES-cli supports Windows, Mac, and Linux.

### Installing Dependencies
Install all of the following dependencies. The [Beginner's Guide](https://github.com/NMMES/nmmes-cli/wiki/Beginner's-Guide#chapter-1-installation) contains instructions on installing these dependencies on different OS's.

- [Node.js](https://nodejs.org/en/) - Required in order to run NMMES-cli.
- [NPM](https://www.npmjs.com/) - (Usually packaged with Node.js) Required in order to install the NMMES family.
- [ffmpeg](https://ffmpeg.org/) - Does the video conversion among other things.

### Selecting the Correct Version
NMMES-cli is divided into 3 separate version identities: Stable, Next, and Bleeding Edge. It is always recommended that you install the Stable version. If you are looking for additional features that have not yet landed in stable, you may attempt to use the Next version. This will give you access to features that are for the most part complete and usable but still require additional testing. If you plan on doing any kind of development on nmmes-cli it is recommended you use the Bleeding Edge version.

In order to determine which version you are using use the `--version` flag.

### Install

##### Stable
If you want to use NMMES-cli use this version.
```
npm install --global nmmes-cli
```

##### Next
If you are looking for new features before they are released use this version.
```
npm install --global nmmes-cli@next
```
##### Bleeding Edge
Only use this version for development work on nmmes-cli.
```
npm install NMMES/nmmes-cli
```

After installing nmmes-cli you will also need to install any modules you intend on using. See [https://github.com/NMMES/nmmes-cli/wiki/Modules](https://github.com/NMMES/nmmes-cli/wiki/Modules) for more information.

## Usage

### Basic
In order to use nmmes-cli you only have to provide one parameter, the file or folder you wish to encode. All other parameters will fallback to defaults.

Example
```
nmmes my-videos-folder
```

After running this command a command line interface will open to display the progress of your encodings as well as a log to display relevant information.

All finished encodes will be deposited to a nmmes-out folder relative to your current working directory.


### Options

The `--version` flag displays the current version of nmmes-cli in use.

If you get a [semantic version number](http://semver.org/) (Ex: 1.0.0) you are using the Stable version. If you get "next" you are using the Next version. If you get a git branch and commit id, for example "nmmes-cli (Development Build) master#3c95c8a", you are using the Bleeding Edge version.

Type Boolean<br>
Default: false<br>
Example: `nmmes --version`

---

The `--help` option displays a list of information about nmmes-cli's usage as well as module specific options.

Type: Boolean<br>
Default: false<br>
Example: `nmmes --modules he-audio --help`

---

The `--temp-directory` option allows you to choose which directory should be used to store files still in the encoding process.

Type: String<br>
Default: A folder named nmmes-cli in your system's temporary directory.<br>
Example: `nmmes ~/videos-to-convert/video.mkv --temp-directory /tmp`

---

The `--destination` option allows you to choose where finished encodes should be deposited.

Type: String<br>
Default: A folder named nmmes-out in your [current working directory](https://www.computerhope.com/jargon/c/currentd.htm).<br>
Example: `nmmes ~/videos-to-convert/video.mkv --destination ~/Videos`

---

The `--output-format` option sets the container to store the finished encode in. This option is only technically limited to ffmpegs muxing ability and container codec compatibility. More options can be found in ffmpeg's [file format support](https://www.ffmpeg.org/general.html#File-Formats) and [muxing support](https://ffmpeg.org/ffmpeg-formats.html#Muxers) documentation.

Type: String<br>
Options: mkv, mp4, m4v<br>
Default: mkv<br>
Example: `nmmes ~/videos-to-convert/video.mkv --output-format mp4`

---

The `--modules` option defines a list of modules which should be installed/loaded and used to process the input. You can find a list of modules on the [npm directory](https://www.npmjs.com/search?q=nmmes-module). Be mindful of the order you define modules in since that is the order they will run in.

Type: Array<br>
Default: normalize he-audio encoder<br>
Example: `nmmes ~/videos-to-convert/video.mkv --modules encoder sample`

---

The `--profile` option defines a url or name of an encoding preset. Enter `--profile list` to see a list of available local profiles or check the [github profiles directory](https://github.com/NMMES/nmmes-cli/tree/master/src/profiles).

Type: String<br>
Default: none<br>
Example: `nmmes ~/videos-to-convert/video.mkv --profile anime`

---

The `--delete` option deletes the source file when an encode has completed successfully and replaces the original with the new encode.

Type: Boolean<br>
Default: false<br>
Example: `nmmes ~/videos-to-convert/video.mkv --delete`

---

The `--debug` option sets the log level to debug.

Type: Boolean<br>
Default: false<br>
Example: `nmmes ~/videos-to-convert/video.mkv --debug`

---

The `--watch` option places nmmes-cli in watch mode. The input directory will be watched for newly added video files and will process these videos.

Type: Boolean<br>
Default: false<br>
Example: `nmmes ~/videos-to-convert --watch`

---

The `--skip-video-codec` option instructs nmmes-cli to skip videos already encoded with a specific video codecs.

Type: Array<br>
Default: <br>
Example: `nmmes ~/videos-to-convert --skip-video-codec libx265 vp9`
