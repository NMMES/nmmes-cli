## This is pre-alpha software.
## --Work in Progress--

# NMMES-cli
---

The NMMES command line interface frontend of the NMMES-backend. Use it to encode large libraries of videos to another format.

* [Installation](#Installation)
* [Version](#Version)
* [Usage](#Usage)
  * [Basic](#Basic)
  * [Advanced](#Advanced)
  * [Options](#Options)
*  [Uninstall](#Usage)

## Installation

NMMES-cli supports Windows, Mac, and Linux.

### Installing Dependencies
Install all of the following dependencies. The [Installation Wiki](#) contains instructions on installing these dependencies on different OS's and distributions.

- [Node.js](https://nodejs.org/en/) - Required in order to run h265ize.
- [NPM](https://www.npmjs.com/) - (Usually packaged with Node.js) Required in order to install h265ize.
- [ffmpeg](https://ffmpeg.org/) - Does the video conversion among other things.

### Selecting the Correct Version
NMMES-cli is divided into 3 seperate version identities: Stable, Next, and Bleeding Edge. It is always recommended that you install the Stable version. If you are looking for additional features that have not yet landed in stable, you may attempt to use the Next version. This will give you access to features that are for the most part complete and usable but still require addtional testing. If you plan on doing any kind of development on nmmes-cli it is recommended you use the Bleeding Edge version.

In order to determine which version you are using use the [`--version`](#Version) flag.

### Install

##### Stable
If you want to use nmmes-cli use this version.
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
npm install --global nmmes/nmmes-cli
```

## Usage

### Basic
In order to use nmmes-cli you only have to provide one parameter, the file or folder you wish to encode. All other parameters will fallback to defaults.

Example
```
nmmes-cli my-videos-folder
```

After running this command a command line interface will open to display the progress of your encodings as well as a log to display relevent information.

All finished encodes will be depostied to a nmmes-out folder relative to your current working directory.

### Advanced

#### Watch Mode

### Options

#### Version

The `--version` flag displays the current version of nmmes-cli in use.

If you get a [semantic version number](http://semver.org/) (Ex: 1.0.0) you are using the Stable version. If you get "next" you are using the Next version. If you get a git branch and commit id (Ex: master#3c95c8a) you are using the Bleeding Edge version.

#### Help

The `--help` option displays a list of information about nmmes-cli's usage.

Type: Boolean<br>
Default: false

#### Temp-directory

The `--temp-directory` option allows you to choose which directory should be used to store files still in the encoding process.

Type: String<br>
Default: A folder named nmmes-cli in your system's temporary directoy.


#### Destination

The `--destination` option allows you to choose where finished encodes should be deposited.

Type: String<br>
Default: A folder named nmmes-out in your [current working directory](https://www.computerhope.com/jargon/c/currentd.htm).

#### Preview

The `--preview` option ensures the encoder only encodes a segment as long as defined by [`--preview-length`](#Preview-Length).

Type: Boolean<br>
Default: false

#### Preview-length

The `--preview-length` option specifies the length of a preview in preview mode and/or a sample in milliseconds.

Type: Number<br>
Default: 30000

#### Preset

The `--destination` option allows you to choose where finished encodes should be deposited.

Type: String<br>
Default: A folder named nmmes-out in your [current working directory](https://www.computerhope.com/jargon/c/currentd.htm).

#### Native-langauge

The `--native-language` option sets the target language for normalization. The native-language option can parse [*ISO 639-1* and *ISO 639-2*](https://www.loc.gov/standards/iso639-2/php/code_list.php) (Ex: ja, jpn) Codes as well as the languages full english name (Ex: Japanese).

Type: String<br>
Default: eng

#### Output-format

The `--output-format` option sets the container to store the finished encode in. This option is only technically limited to ffmpegs muxing ability and container codec compatibility. More options can be found in ffmpeg's [file format support](https://www.ffmpeg.org/general.html#File-Formats) and [muxing support](https://ffmpeg.org/ffmpeg-formats.html#Muxers) documentation.

Type: String<br>
Options: mkv, mp4<br>
Default: mkv

#### Video-codec

The `--video-codec` option sets the container to store the finished encode in. This option is only technically limited to ffmpegs muxing ability and container codec compatibility. More options can be found in ffmpeg's [file format support](https://www.ffmpeg.org/general.html#File-Formats) and [muxing support](https://ffmpeg.org/ffmpeg-formats.html#Muxers) documentation.

Type: String<br>
Options: mkv, mp4<br>
Default: mkv

#### Quality

The `--quality` option sets the container to store the finished encode in. This option is only technically limited to ffmpegs muxing ability and container codec compatibility. More options can be found in ffmpeg's [file format support](https://www.ffmpeg.org/general.html#File-Formats) and [muxing support](https://ffmpeg.org/ffmpeg-formats.html#Muxers) documentation.

Type: String<br>
Options: mkv, mp4<br>
Default: mkv

#### Profile

## Uninstall
```
npm uninstall --global nmmes-cli
```
