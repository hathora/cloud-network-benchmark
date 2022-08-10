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
      --help         Show help                                         [boolean]
      --version      Show version number                               [boolean]
  -r, --regions      Regions to benchmark                      [array] [default:
               ["useast","uswest","southindia","singapore","london","saopaulo"]]
  -p, --providers    Providers to benchmark
      [array] [default: ["fly","aws-ga","aws-ec2","azure","gcp","do","contabo"]]
  -n, --num-pings    number of pings per server           [number] [default: 50]
  -s, --packet-size  packet size in bytes                [number] [default: 100]
  -o, --output       output filename                                    [string]
```
