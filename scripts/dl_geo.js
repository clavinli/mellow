const axios = require('axios').default
const path = require('path')
const os = require('os')
const fs = require('fs')

const geoipUrl = 'https://github.com/Loyalsoldier/v2ray-rules-dat/releases/latest/download/geoip.dat'
const geositeUrl = 'https://github.com/Loyalsoldier/v2ray-rules-dat/releases/latest/download/geosite.dat'

async function downloadGeoIP() { 
  const dstPath = path.join(__dirname, '../src/helper', 'geoip.dat')
  const writer = fs.createWriteStream(dstPath)
  console.log('Downloading', geoipUrl)
  const resp = await axios({
    url: geoipUrl,
    method: 'GET',
    responseType: 'stream',
    onDownloadProgress: (e) => {
      console.log(e)
    }
  })
  resp.data.pipe(writer)
  writer.on('finish', () => {
    console.log('Saved file to', dstPath)
  })
  writer.on('error', (err) => {
    console.log('Download geoip.dat failed.', err)
  })
}

async function downloadGeosite() { 
  const dstPath = path.join(__dirname, '../src/helper', 'geosite.dat')
  const writer = fs.createWriteStream(dstPath)
  console.log('Downloading', geositeUrl)
  const resp = await axios({
    url: geositeUrl,
    method: 'GET',
    responseType: 'stream',
    onDownloadProgress: (e) => {
      console.log(e)
    }
  })
  resp.data.pipe(writer)
  writer.on('finish', () => {
    console.log('Saved file to', dstPath)
  })
  writer.on('error', (err) => {
    console.log('Download geosite.dat failed.', err)
  })
}

function findInDir (dir, filter, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);

    if (fileStat.isDirectory()) {
      findInDir(filePath, filter, fileList);
    } else if (filter.test(filePath)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

downloadGeoIP()
downloadGeosite()
