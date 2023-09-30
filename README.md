# TypeScript Boilerplate Template

A minimalistic TypeScript boilerplate template to kickstart your TypeScript projects on GitHub.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)

## Features

- TypeScript pre-configured.
- Minimal project structure for quick start.
- Includes common configuration files like `.gitignore`, `.eslint`, and `.prettierrc`.
- Easy to extend and customize.

## Getting Started

Follow these instructions to get started with your TypeScript project using this boilerplate template.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your development machine.

### Installation

1. Clone this repository to your local machine using:

```bash
git clone git@github.com:Huijiro/typescript-base.git
```

### Navigate to the project directory:

```bash
cd typescript-boilerplate
```

### Install the project dependencies:

```bash
npm install
```

# Usage

Once you have installed the project and its dependencies, you can start writing your TypeScript code in the src directory. You can also customize the project configuration files to suit your needs.

### To build your TypeScript code, run:

```bash
npm run build
```

This will generate the compiled JavaScript code in the dist directory.

### To start a development server with automatic code reloading, run:

```bash
npm run dev
```

# Folder Structure

The project structure is minimal and organized as follows:

```bash
typescript-boilerplate/
├── src/
│ ├── main.ts
│ └── ...
├── dist/
│ └── ...
├── .gitignore
├── .eslintrc.json
├── .prettierrc.json
├── package.json
├── tsconfig.json
└── README.md
```

- **src**: Contains your TypeScript source files.
- **dist**: Contains the compiled JavaScript files (generated after - running npm run build).
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **.eslintrc.json**: Defines linting rules used in the project.
- **.prettierrc.json**: Prettier configuration for code formatting.
- **package.json**: Project dependencies and scripts.
- **tsconfig.json**: TypeScript compiler configuration.

License
This project is licensed under the MIT License - see the LICENSE file for details.
