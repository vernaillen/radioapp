import {DefaultMediaApp, PersistentClient, Result} from '@foxxmd/chromecast-client'

export default eventHandler(async (event) => {
  const { src } = await readBody(event)
  console.log('loading stream:', src)

  const client = new PersistentClient({host: '10.0.2.10'})
  await client.connect()

  // launch the media app on the Chromecast and join the session (so we can control the CC)
  const media = await DefaultMediaApp.launchAndJoin({client}).then(Result.unwrapWithErr)
  
  // if the media app failed to load, log the error
  if (!media.isOk) return console.error(media.value)
      
  await media.value.queueLoad({
      items: [
      {
          media: {
              contentId: src,
              contentType: 'audio/mp3',
              streamType: 'BUFFERED',
          },
      },
      ],
  })
  
  // after 10 seconds of playing video, stop playing and close client
  /* setTimeout(() => {
      media.value.stop() // stop playing stream
      media.value.dispose() // clean up media app event handlers
      client.close()
  }, 10000) */
})
