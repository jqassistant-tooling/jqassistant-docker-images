# jQAssistant Jupyter Notebook

## Overview
This Docker image provides the jQAssistant Command Line utility.

## Usage

For scanning the current directory and running analysis run the following command:

.Linux
```
docker run --rm -v ${pwd}:/workspace jqassistant/cli scan analyze -f .
```

.Windows
```
docker run --rm -v %cd%:/workspace jqassistant/cli scan analyze -f .
```

In both examples the volume `/workspace`  is mounted to the current directory. 
It is used by the jQAssistant command line utility as working directory. 
A configuration file `.jqassistant.yml` located here would be evaluated for execution. 
