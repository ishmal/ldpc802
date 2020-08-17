#ifndef __CRC32_H__
#define __CRC32_H__

#include <stdint.h>
#ifdef __cplusplus  
extern "C" {
#endif  


/**
 * Calculate the crc32 checksum for an array of bytes
 * @param {ubyte *} bytes array of bytes
 * @param {int} len number of bytes in array
 * @return {uint32_t} the crc
 */
extern uint32_t Crc32ofBytes(uint8_t* bytes, int len);

  
#ifdef __cplusplus  
}  
#endif  




#endif /*__CRC32_H__*/

