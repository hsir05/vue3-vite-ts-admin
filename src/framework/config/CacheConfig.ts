import { ICacheConfig } from "@/framework/config/type/ICacheConfig";

export const cacheConfig: ICacheConfig = {
  // 默认缓存时间
  defaultCacheTime: 60 * 60 * 24 * 7,
  // 是否在向 sessionStorage 和 localStorage 中存储时开启加密
  enableStorageEncryption: !import.meta.env.DEV,
  // 密钥，enableStorageEncryption 为 true 时起作用
  storageEncryptionKey: "_11111000001111@",
  // 密钥偏移量，enableStorageEncryption 为 true 时起作用
  storageEncryptionIv: "@11111000001111_",
};
