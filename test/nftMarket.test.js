const NftMarket = artifacts.require('NftMarket');

contract('NftMarket', (accounts) => {
  let _contract = null;

  before(async () => {
    _contract = await NftMarket.deployed();
  });

  describe('Mint token', () => {
    const tokenURI = 'http://test.com';

    before(async () => {
      await _contract.mintToken(tokenURI, {
        from: accounts[0],
      });
    });

    it('owner of the first token should be address[0]', async () => {
      const owner = await _contract.ownerOf(1);

      assert.equal(
        owner,
        accounts[0],
        'Owner of token is not matching address[0]'
      );
    });

    it('fist token should point to te correct tokenURI', async () => {
      const actualTokenURI = await _contract.tokenURI(1);

      assert.equal(actualTokenURI, tokenURI, 'TokenURI is not correctly set');
    });

    it('should NOT be possible to create a NFT with used tokenURI', async () => {
      try {
        await _contract.mintToken(tokenURI, {
          from: accounts[0],
        });
      } catch (error) {
        assert(error, 'NFT was minted with previously used tokenURI');
      }
    });
  });
});
