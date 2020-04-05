# svg-render-server
It renders SVGs.

## Example Usage

### 0. Have SVGs
```sh
wget https://upload.wikimedia.org/wikipedia/commons/7/77/Wikipedia_svg_logo.svg
```

### 1. Run 1-4 instances on a machine behind a load balancer.
```sh
# Maybe you should edit the Swarm file for your Traefik setup first.
docker stack deploy -c docker-swarm.yml svgrender
docker service scale svgrender_server=4
```

### 2. Feed it SVGs as HTTP data.
```sh
curl --data-binary "@./Wikipedia_svg_logo.svg" http://svgrender.127.0.0.1.xip.io > cbt.png
```

### 3. Profit.
what's profit lol

## Development
```sh
# Install deps
pnpm install

# Runs the server
node server.js
```

## Credits
* [@Mstrodl](https://github.com/Mstrodl) for [original code](https://github.com/Mstrodl/svg-render-server)
* [@nepeat](https://github.com/nepeat) forking it [here](https://github.com/general-programming/svg-render-server)
