module.exports = {
    apps : [{
      name: 'Main Server',
      script: 'src/server.js',
  
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        TOKEN_SECRET: '74V*7D$$2P5Ga%gOf52PWgjOQOi2R%qLnn@tfzti',
        DBCONNECTION : 'mongodb://localhost:27017/ServerTest',
        CHATSERVER : 'http://localhost:4000',
        SERVER : 'http://localhost:3000',
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }],
  
    deploy : {
      production : {
        user : 'node',
        host : '212.83.163.1',
        ref  : 'origin/master',
        repo : 'git@github.com:repo.git',
        path : '/var/www/production',
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
      }
    }
  };
  