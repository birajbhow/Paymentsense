using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Paymentsense.Coding.Challenge.Api.Core.Cache;
using Paymentsense.Coding.Challenge.Api.Core.Clients;
using Paymentsense.Coding.Challenge.Api.Core.Models;
using Paymentsense.Coding.Challenge.Api.Services;
using Xunit;

namespace Paymentsense.Coding.Challenge.Api.Tests.Services
{
    public class CountryInfoServiceTests
    {
        private readonly Mock<IRestCountriesClient> _mockRestCountriesClient;
        private readonly Mock<ILocalCache> _mockLocalCache;
        private readonly CountryInfoService _subject;

        public CountryInfoServiceTests()
        {
            this._mockRestCountriesClient = new Mock<IRestCountriesClient>();
            this._mockLocalCache = new Mock<ILocalCache>();
            this._subject = new CountryInfoService(this._mockRestCountriesClient.Object, this._mockLocalCache.Object);
        }

        [Fact]
        public async Task GetCountries_Returns_Valid_ViewModel()
        {
            // arrange
            var data = new List<Country>
            {
                new Country
                {
                    Alpha3Code = "GBR",
                    Name = "United Kingdom",
                    Capital = "London"
                }
            };
            this._mockLocalCache.Setup(x => x.Get<List<Country>>(It.IsAny<string>())).Returns(new List<Country>());
            this._mockRestCountriesClient.Setup(x => x.GetAll<Country>()).Returns(Task.FromResult(data));
            
            // act
            var result = await this._subject.GetCountries();

            // assert
            result.Countries.Count.Should().Be(1);
        }

        [Fact]
        public async Task GetCountries_Returns_Empty_ViewModel_If_No_Countries_Found()
        {
            // arrange
            this._mockLocalCache.Setup(x => x.Get<List<Country>>(It.IsAny<string>())).Returns(new List<Country>());
            this._mockRestCountriesClient.Setup(x => x.GetAll<Country>()).Returns(Task.FromResult(new List<Country>()));

            // act
            var result = await this._subject.GetCountries();

            // assert
            result.Countries.Count.Should().Be(0);
        }
    }
}
