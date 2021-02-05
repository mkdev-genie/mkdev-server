module.exports = {
  apps: [
    {
      name: 'aws-codedeploy',
      script: '/home/ubuntu/mkdev-server/app.js',
      args: 'serve -s build -l 3000 -n',
      interpreter: 'none',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
