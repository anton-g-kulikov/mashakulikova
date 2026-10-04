// react-router needs TextEncoder/TextDecoder, which jsdom does not provide.
import { TextEncoder, TextDecoder } from "util";

Object.assign(global, { TextEncoder, TextDecoder });
