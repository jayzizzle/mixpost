import * as keysProd from '../config/keys_prod';
import * as keysDev from '../config/keys_dev';

if (process.env.NODE_ENV === 'production') {
  export default keysProd;
} else {
  export default keysDev;
}
