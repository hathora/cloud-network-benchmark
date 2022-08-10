# cloud-network-benchmark

### Prereqs

Install Node v16.14+

### Usage

```
npm install
node index.js
```

### Arguments

You can discover these by running `node index.js --help`

```
Options:
      --help         Show help                                         [boolean]
      --version      Show version number                               [boolean]
  -r, --regions      Regions to benchmark                      [array] [default:
               ["useast","uswest","southindia","singapore","london","saopaulo"]]
  -p, --providers    Providers to benchmark
      [array] [default: ["fly","aws-ga","aws-ec2","azure","gcp","do","contabo"]]
  -n, --num-pings    number of pings per server           [number] [default: 50]
  -s, --packet-size  packet size in bytes                [number] [default: 100]
  -o, --output       if set, a csv of the raw data will be written to the
                     provided filename                                  [string]
```

### Example

```
> node index.js --regions uswest
aws-ga-uswest min=77.94 median=79.50 p90=82.12 jitter=1.19
azure-uswest min=81.87 median=83.50 p90=88.09 jitter=2.02
gcp-uswest min=82.39 median=84.22 p90=90.14 jitter=3.10
aws-ec2-uswest min=88.25 median=90.80 p90=96.23 jitter=2.53
do-uswest min=88.07 median=90.58 p90=92.96 jitter=1.89
contabo-uswest min=87.20 median=89.28 p90=96.88 jitter=3.38
fly-uswest min=87.87 median=90.65 p90=99.50 jitter=3.69
```
