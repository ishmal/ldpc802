# ldpc
## A simple small library for experimenting with LDPC codes

This codec uses the quasi-cyclic (QC) LCPC checksum arrays used in
IEEE Std 802.11-2016, Annex F.  These are currently used for forward error correction
for 802.11 n, ac, and h devices.  Why?  Not only because they have of course been
tested extensively, but the spec also has test data to validate any new software
implementation.

The codec uses the Log Likelihood Sum-Product algorithm, so should prove to
be very effective in signal reconstruction and sensitivity.


### Adding to your npm project

```
npm i --save https://github.com/ishmal/ldpc
```

### Using in an app
```
import { Ldpc } from "ldpc";

const codec = new Ldpc.LdpcCodec();
codec.withCrc = true/false;   //defaults to true
```
#### Pick a code rate and length
```
codec.setCode("1/2", "648");  // default
codec.setCode("1/2", "1296");
codec.setCode("1/2", "1944");

codec.setCode("2/3", "648");
codec.setCode("2/3", "1296");
codec.setCode("2/3", "1944");

codec.setCode("3/4", "648");
codec.setCode("3/4", "1296");
codec.setCode("3/4", "1944");

codec.setCode("3/4", "648");
codec.setCode("3/4", "1296");
codec.setCode("3/4", "1944");
```

#### Encode
```
codec.encodeBytes(byteArray);
```
or
```
codec.encodeText(string);
```

will break the input data into chunks that fit in codewords,
encode each one, are return an array of bit arrays for
transmitting over an AWGN channel.

#### Decode
This kind of transport is called a "binary input channel."
What comes out of the encoder as 1's and 0's is turned into
analog levels for transmission.

On the receiving side,  we expect arrays of floats for each
message,  centered around 0, < 0 for 1,  >= 0 for 0.

```
codec.decode(array of bits);  //returns an array of bytes
```
or
```
codec.decodeText(array of bits); // returns a string
```


### More information
*  Look at the tests to see how it is done.
*  Feel free to ask me any questions.

### Final
Hope that this helps you in your signal processing project.  If you have any
ideas on how to improve this library, please let me know.

Thanks!







