module.exports = {
  apps: [
    {
      name: 'aws-codedeploy',
      script: '/home/ubuntu/aws-codedeploy/app.js',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
