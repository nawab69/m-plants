import fs from 'fs'
import path from 'path'

// read all json files from metadata-old folder and update the images property of each object
const metadataPath = path.join(process.cwd(), 'metadata-old')
const filenames = fs.readdirSync(metadataPath)

const metadata = filenames.map(filename => {
  const filePath = path.join(metadataPath, filename)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { name } = path.parse(filename)
  // Replace # to %23 in uriName
  const uriName = name.toLowerCase().replace('#', '%23')
  const { compiler, ...meta } = JSON.parse(fileContents)
  meta.image = `https://raw.githubusercontent.com/nawab69/m-plants/main/images/${uriName}.png`
  meta.properties.files[0].uri = `https://raw.githubusercontent.com/nawab69/m-plants/main/images/${uriName}.png`
  return { name, meta }
})

// write all metadata as separate file in metadata folder
const metadataFolder = path.join(process.cwd(), 'metadata')

metadata.forEach(({ name, meta }) => {
  fs.writeFileSync(
    path.join(metadataFolder, name + '.json'),
    JSON.stringify(meta, null, 2)
  )
})
