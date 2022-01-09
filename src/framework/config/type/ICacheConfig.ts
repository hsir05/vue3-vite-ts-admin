export interface ICacheConfig {
  // 默认缓存时间
  defaultCacheTime: number;
  // 是否在向 sessionStorage 和 localStorage 中存储时开启加密
  enableStorageEncryption: boolean;
  // 密钥，enableStorageEncryption 为 true 时起作用
  storageEncryptionKey: string;
  // 密钥偏移量，enableStorageEncryption 为 true 时起作用
  storageEncryptionIv: string;
}
