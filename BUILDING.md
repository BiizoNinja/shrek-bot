

# Building ShrekBot

## Installing prerequisites

The instructions below installs:

- [git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/)

### Microsoft Windows

_Microsoft Windows 7 or later is required_

#### Chocolatey

1. Follow the installation steps on [docs.chocolatey.org/choco/setup](https://docs.chocolatey.org/en-us/choco/setup).

2. After installation, run the script below.

```ps1
choco install nodejs git
```

#### Scoop

1. Follow the installation steps on [lukesampson/scoop](https://github.com/lukesampson/scoop).

2. After installation, run this scrpt below.

```ps1
scoop install nodejs git
```

### macOS

_macOS Mojave (10.14) or later is required_

#### Homebrew

1. Follow the installation steps on [brew.sh](https://brew.sh/).

2. After installation, run this script below in a terminal.

```bash
brew install node git
```

### Linux

#### Installing prerequisites via built-in package managers

| Distribution         | Command                              | Package Manager                                               |
| -------------------- | ------------------------------------ | ------------------------------------------------------------- |
| Arch Linux / Manjaro | `sudo pacman -S nodejs git`          | [`pacman`](https://wiki.archlinux.org/title/Pacman)           |
| CentOS / RHEL        | `sudo yum install nodejs git`        | [`yum`](<https://en.wikipedia.org/wiki/Yum_(software)>)       |
| Debian / Ubuntu      | `sudo apt install nodejs git`        | [`apt`](<https://en.wikipedia.org/wiki/APT_(software)>)       |
| Fedora               | `sudo dnf install nodejs git`        | [`dnf`](https://docs.fedoraproject.org/en-US/quick-docs/dnf/) |
| Gentoo               | `emerge net-libs/nodejs dev-vcs/git` | [`portage`](https://wiki.gentoo.org/wiki/Portage)             |

## Getting the files / Cloning shrekbot

1. Open a Terminal (Command Prompt, Terminal.app, etc.)
2. Change the current working directory to the location where you want ShrekBots folder to be (git will auto create a folder called `shrek-bot`)

```bash
# This command below will change the current directory to the Desktop!
cd Desktop/
```

3. Type the command below

```bash
git clone https://github.com/BiizoNinja/shrek-bot.git
```

4. Press the **Enter** Key to execute the command (Don't close the terminal yet!)

```bash
$ git clone https://github.com/BiizoNinja/shrek-bot.git
> Cloning into `shrek-bot`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```

## Setting up ShrekBot

1. Run the command below

```bash
# This will change your directory to "shrek-bot" then will install the packages required to run ShrekBot!
cd shrek-bot && npm install
```

2. Replace TOKEN with the bot token you obtained from the [Discord Developer Portal](https://discord.com/developers/applications)

```bash
echo "BOT_TOKEN = 'TOKEN'" > .env
```

3. Run the command below to run shrekbot!

```bash
node .
```

After this the bot should be online. If you have any problems feel free to ask in our [discord server](https://discord.gg/V9DHGNtuUe).
Or if you do not want to do all this, we recommend inviting the [public version](https://dsc.gg/shrekbot).
