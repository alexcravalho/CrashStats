# What image do you want to start building on?
FROM node:10

# Make a folder in your image where your app's source code can live
RUN mkdir -p /CrashStats

# Tell your container where your app's source code will live
WORKDIR /CrashStats

# What source code do you what to copy, and where to put it?
COPY . /CrashStats

# Does your app have any dependencies that should be installed?
RUN npm install
RUN npm run build

# What port will the container talk to the outside world with once created?
EXPOSE 80

# How do you start your app?
CMD [ "npm", "start"]