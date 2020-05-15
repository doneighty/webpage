/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
 
  // The base Class implementation (does nothing)
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
           
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
   
    // Populate our constructed prototype object
    Class.prototype = prototype;
   
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;
 
    // And make this class extendable
    Class.extend = arguments.callee;
   
    return Class;
  };
})();


// ###################################################################
// shims
//
// ###################################################################
(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

(function() {
  if (!window.performance.now) {
    window.performance.now = (!Date.now) ? function() { return new Date().getTime(); } : 
      function() { return Date.now(); }
  }
})();

// ###################################################################
// Constants
//
// ###################################################################
var IS_CHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CANVAS_WIDTH = 640;
var CANVAS_HEIGHT = 640;
var SPRITE_SHEET_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAD+CAMAAABcHOa4AAAChVBMVEUAAAD/sgD/1wP/uwL/zQL/xQ7ecwP/4QP/qgH+pADthwC2Brz7IgD/wQLnfgH7ngD2lwDwkAD04bSrBbL/zhP8/5b9/7T/bgChAqj8/Wz/wlP/6QSUAp2HBI2qYQL/ZABYBlf+z2RCBUb+oSbAWsP/mQeWUQJvA3X+NgD57cfZdhj9gwX8/nsPtwRmAmp5A3//WgD46L38/ob/2G39yyT5EQCIRAD9/F397Up4GAD/ylu2S7n/TwCeWgP/eAH+RAAr0Qn45tD33Kf+6V3+uEc33wkHpgT+jgKtO7ChMaSRI5X/rTihcA/tle7PW9OKUg2+KcPxzqz9/6Xw1pz8+lP/30H9/8H+720UyATzz4wIggL99Hz8+0TeijiygAzw4sf/1TIEkgP+2B343MPhmlb+4DL95B8tvQrEQsrtx6HdgCbFXBIKcwT+7TjZb9vkqWj98R31vGPkmUT99zLdngnehOB+G4Lyp1ThwRzOddDzu5XMpiD2uRD9+Jb6syTEgAa4QQS81fPntH/urQWNKgP/4FDXjEngxZV+LYLljij6jRjrxhHaXweoLQH307rkx3fMej302BKcUJ6hQgr3y31iIWbwTCrXtRnCmBXtoA38yD8fpgj1xQTURQKpbKqPRJP0noPAok25ixP0WAnVigXhxuHwKg/QmgnxoTGWaytL6gv2lGbUtmWxkDnMss/5sHVcvk3p1jG2bgS4g7nDn2/ykED0bwXM78Gz26ukXqbu42q5ZzNxhQrBmsHf0LYKYQKhwOvat9n57K7JtYt+v3jgzk/xbUrx6ZOX43zZ4OgvoCmvpwvHvriPZ4f4cB8bOgB3TXVxwwo9PgHO3tN/7FReSQB7UQZGIGfrAAAAAXRSTlMAQObYZgAAFk1JREFUaN6s0rGKo1AYhuGtUgyyrWCxEiQQ5jSBweIEUQKChVWuIWUuYCGVhZVEm4CdEBDSWFjFS0iZa9rvfJ5Ed83sbjEvBEzwyf978NvXVxza9idr20Px/6y9ZkJkmcMydX1tt/92u/ba+ZkTW+v5B5vPrdDJ/O7aFn8f2NxN4YRQQ/SWI8x78zneKRhbhBO8jjPg3Wt5uNu+Y83Zx8jjC8Nk+354JdvOFuoRP2u9tmJh181UNrUtnDi01rqBAKksKwydiHYi/QVoaAFPo4xjZzGde65XpogcJyZ+VUgZRf6qPo9lcfdsX0TRgnbA6xGkFMK3vXo7Xtdbmb4vBCzxoOk40emlb6686yC3dbCytSWmfhZr2EvQ0dgm8EBh1dJZRjyOrzIhpL3yguZJb0tQWOAuSdPT/h1cBaT6vj/h11kvQZe3h9yUy+Bhuz1uk/I0y7D6QpXNTlKmpx/7DpAyWJY7TXektHxg8Y6bk7eIiQR/9P7Gx6QENUbUCNRYBGuqpSWsYHuJks7XkkNJ+0oDY/VcdJTodBQM66JqkKSb5zFdHpa4kijFIJZzrIZKgvKY2Bl0ZDk11zv6Caf+Ji/nJy1KQ9kAlkvvU5kfuTtwl8s06Qi57dIwyoKMNRdtNZ4dO0rWHY/mA1JeGqLnGSNYYmhWIxvREQaAhsuhzw4XV1lO7nVd5anEqlVN10+kvBxIxielUpa6yqUur+ke0OUZ/WFdl5i6SmWaJwij8wqOEE2l3llh6gqLelygxiUdoVti22nFjYO1Hhqca9yKqWPn0kXGJCh+Si77us25xC1oQD10CX/RWj4vagNRAE5MMt0Ixhr2HCilgXgLlUILORgWeg455aBC10vMISQIFhEVbSNibAJKqYuFHmQV2pPsLdCDhfbf6suMprtbaHvpB46T5H15783EH1Xqj3S/vyexhGOh1++/d6m/UzU+f39/fX2yr0H7bFepf+ad0f2E6RqX1H9Ft24fNQi3LuviaXpQqGyqUpTqucaxWTDEycQUVUUVARVGuIXbf0QRJo9+ZOZVB0aRJBOP0aZpigC5vyIaomGZvy/W23GteqwRe4oCwapuTia6ilV8JKrg3zOfFpiVC+9fdfB0SAaqoqgHK4rwHJuWBS2YRuOu+oKrXHlQsKGbFoRHpEndXEbLdArg8mGedn23aAUvDY6IvkQWSQ63MXUVzJTUUXGsCit2l69kPRRdT4PBBI/0mbm6TmoX75l2WhneC6ymKUmIAhWIgG75uyvPWnrLe/1O3MgErMgdWRZc9/2OZ+mHw0FfdvxOx/O8Tk2gGZru9bxJQ/Q7etbqu7jmA7UWQuVWq4XCjyGa7rDhDIeOUy6XwxKd0ndtcVekX+DN9CpXKmXHjhMCHzHhx/l8PgzDsuOkv7dxHIy6Ux6bS9EEk75QUtUfc0/h3QhARq3RpyCOY2dOGMJrkeDmoj42FWta5Pk+edztKUl/2XRHI5ucihPnRJIk3/BJc9W/8P1pqVgsYpO4HoziKNKrNlYbN5C5VYM6gyAdbr5Sl6OuaJnudLdbrS6sX/tjGPDwXozPxrvVuN9xLXFykyzQWHrz5jl0mtxM3nWToRMETdcyTZ14GY2R23nM8/wZn3eclt9stlCB7SHHiWuB67r+Rhqi/XwoTOPANuxbXxyXxihGQug4qIQW+x673iwWaDVmx7UgWSTJvr3O5dgcOx7D52RTdsqo1jia1RoKhwKdh314thisWTaXew3FSgP5Gfzp0TZYBFiWKxQYvpQXWpk6FcLhhmZWaA9xW0mrzx681mRJlrezdppxVtekLdwSVHig+Jd5rGJ8AQ0RzQA9bvsM2K9zs9mr2QxSPcjl1lJ6botNhj4rvhRq1AkXGkVnNFPgWG4gS5KspVLGTE7PDTiugJM+ySM3U+2ykM/zNLgFrq1pUHGFSOd4rNRlSdPaOCckLQllm8poovzD4hm4DLj1+ofZOQHklMqHev1k8g/zyKd+YZTB5bHLcFzlnGWPbgWP3DnHcczJzJJm3ZawS2RCD+AITCpisyRknWYlC1AzkYFCrz2QNFnW9oNVj8nEIphQ7l2qwdEFGWin+yEDP5kvg9e0oTiOV2yiBqxGnLAJhTH0YLtDh7hQ8GAz1sMCYe3S0GYRKxqoKLOdMKnVgqWVVZjIhDp3ShFWoR4cPUlBaBEPHoQd+vfslzyRRqzrcR8kxvf4+PvJM++bwPH3D3XICCZ0i5+MxRe4ERwnSCQb626ff36I2+cmjOApJQkcj0yKy7wHCoNsMZHfYSFH+H3zFlWEkp78BFHdJ3Akk7C293DPW5GIiw8/xhZEVSbrh4f1ekqhXodzgkRiYWYaOxEPsknrEBJ5nsjOVBFd9RERdPgCBA5aLJJ/7G2BrfApciKKsZgowq5SsM3899g2ny/XvCq12nIFMu5xrC97MXuYo3leEASePo56MaxWWfqnt1TJHWAcn3Xc2IYDNseaQIf0uWcrU8VAJafz0lmH4+a2cYWG4GR9Y2NN4DDdmynyek6H0dlsryQ32CvocEPhtsE2S71sVgjpj3YDD5i7Jl2Iv2w2WLYhbzpG9K6UkabcpjHjO9tk06LjeOFSluVS74mGXulSBlWgvaYXK5PNEM23u21hUeHVCPWjABM8P9mtWI3eY5puNxmm2W0/RSyiN7orB2GUpo85zHUx/ntXTl36EMdxFNWVG3dMtUu9HvKhm2Hu2GaXoiiY9xpXd8fUL6tGzBuKRqOJBMVl/D6WOaM+KrSCrI+ttqhEIhGNhkJ2vetU27LtdFVnttvDYUmSkslExu/3Ma3PQCLoc/vPwYOJcBj2ZL1pQVt2f8Gl02OzShhKTinNuP3BdFKlVYUMyoQlgwHmILFAvdD2S4BqRm65yrrP05ITkZTSVb8vWEQJa9ZDSH7VLO4e4TKCOwvuUZCpFiWnwWAA0eA0wKucYZjULICp6tx7jTpnNaGys7/OytCbQUs5nSnCnBJZFlKrRlQVuWqmnvX71yr9frqIEhNMsxLNhEej5nHSonSsusX+dfw+4CslMXQ/YJ2LBTSbqIeAsuBCrPWvO51OPL41It7pKLIZFSXHAisgqmXBPWDAU8WfSNzeRrKSeCia98cSBxLWotQ9H6gmCNsjtuLxzoA5gLxTTHH8T7wHwQ7u0d2gswW8RbxUj0rdwZ8UimYI9TG+xXACek79pbTsVRuGoSicqXTtG3TrpDzDXSRKyQNcPBRECxeCx1DomqHkHQQdSkLBQxHtYA3NEPBgDKXNj9+nRwodkjopPSS2ZfvTuUc2XLefuQWpFBMpyMS/tUCfT1NrHnc0usSO2lWOChULa2JMoFy0Tihac/oc6GKR92ywQkijiIhZYM3R1Jhs1Y7QmkF26iZ29uk7UJBas4iLVTODzdpXWA4P98nx8GR6ba2jQmsNXwQVoOycG6Cn3x7rd/VyuRSGZfphnZAzVi60fHrYvn9lXXeRpYZAGPWDAuMk8SHdErz431y92aTySCRirDVQXRRxLoiKYlOCDbtMHNakt9UWkCbBXgyGyG2sOONEmrBv570vsTXxqmENgY0zkJCKwppjDpHqwApJjGhMenk4HWBhlc0MC2hCer3pJOEqzkZLleWZQl6QCO0yxwQOed0hV8Bl1SglLs8bIUaVAqLJc2vg6OsQyt4RhcpXVViXlW98hQE2oWqaxnc+y8V81vtD6/XeiflL2n307x4XvX9o9jbpT5Ld13n/4uryfsd69s0mHeM4CANRGN5+SzcUtmShSO7sA/gCtgvEMai2C1JuQI1ES6q0NKlSUOQAkfZI+zwODkb7d2H0ZUaC5T6PVzQ+7uuzmJxtMFpOC9EaVnBmL+dn+tNx6A0SyMT667wkdukYF0rLOlMptRG8Yqx1PvRKieCdtaeYtXhklBq8axmruDBaS1A68gUKq1Vco3CAByqzDjrOjYoQ9JeuXyRswhgHZ6kuZ1Me1xAkugKi+U1he29xoWuPOWfj5ixfSeaT48rY938xDLzAWjr39pUtLTXBe5Yq1ZYnm2Rupp1VrMCFxZDezKv8GJUynPOP3UPQJEFh1b2go1aipEVJJmrUcDss3Wh2B0sQVBg97+iMpUR3st3aMFmi+7WDNqCQFAPrUNM0XdN1pCsM2ZsqvWa56Hwv13Utp96fmk9umCSeiirTR6brRundhWGq62m8/KRs/NWHgGGyoNdM/wirY9SGYSiM4z1IB2EE2XqOYCj0GJ28SaAbaBZ4lW7gxZMGD7lZ/+8pamKT4G9JBv/8SbZ5WoWqZIuyzsrlxWkSfcmyblaNPdKt0ya1aIjhm7hixLJrKL1HunTaZIhIg5QEuc1s1UKPe+UJN/rDY50mrib2Tgdi7KRL7nR70KrvtVP33Oq0NUzU3ull914XviahV9YLDdGYCtPk2cx5UtpL8+4b1s0ykKxQ54Lrkt4QHNT+XqHMuS+/H5EROwptVkWueeUfd5JSy3xrpevHLotnDD5Zl9kjmUsQGVSOn+3xHrJ5qe02lKHHpABE8p2JTEeJjdg+fyN1ld+aohmKfchLfnlsFe/FSnGqNtxjU2IaslqRnn2+zBo7Rv8HqJXIdHt/huWG0XACUzeOnEJlOTkAS/TsGd4jzvuYgWe5rQku7Q3BSt7OXefbHzV2zNIwEEcB3BAyZIpCLXSU4tAxIbTBsVdwPGiTQrgMR6GjQyendjsEl4B0FjIICdy56GLGgvi1fJeUGmopdfQNl3D3fxyETL+3548nHfwWry9n/yI9F+n93UIqCmnVHHIVD0+1EJjGbA4MYRWGBPOZZa5uJidYiGlx4o2nP3vTtkc42gv3WHGxMloRa+96jbZoGUfK665hRfAHOdlMkXoTL+3Ng1RKEt/org9fOXJgIUttKLSQXw0MqXbe40sWmc7owMXDrm1GzKvoQ9F+kY7rLGXRp1m6xIHHhGXnw1/N3DGhKKxmkFT1qcQ0klGqylpE8L2F5exriJsDNAhwaosgLKNFqcdLSiXbmggchUTmde7ug4YvBAmCMAwHOp1MVZhSqs9OZ1CFkECIyDfO75vN+NGBoiABAgEJdxnoJQmTJEAwwLllX8SNan5rQ1H4HIF7wEAweocl0c8kgYkg+pRz3/rmznxe0wbjMG6WFlygMIvzsJ2kRFjPIjLwECt4CQQ8rEhRS1Z7cBTWbbBArGLHFJlQCwONt3mxByk4vBWCIDsI7n/a880bjYn2x3nPwcNrPvlGieH1+fjTN5IzVECLghJbjeblfldHun1Z1j4jI9cKmpTtHU4Usu4qhJoQtSMrMRZZRxeDdGR7QZF11apDgH51VSF2i6Jqej+PDl67/ogO5TWCHiXPVpiqQKchNBek1ATKEUswmo9rlCcUeqVYK88WpB9owYuy9ga0J4QRCJS30JKDUouyHMvixmzUrkOEkuR0N06LYsOjPyoDit9VZyYbGnDpEYHGOmxwNB0PBt1qtTvQh1fRoE3usKEePcJaFMutwBbI0zkKNSWiKPgNmWO5+gXaAeQGPVJ3FIfxOxJTxrOG3tG0H5qmdXRz9leJRarf+GUHU3f1PgvFUU3I/V8NX2FY3g4yR1K+8s2mej+RqNqSY6Me4TgDl9bDw69hcNtIlCTJjembNXr4GIatR07WFAdZCnKHDToVUBaeMy59mFsuV8qMrEueIiSHtt8wKq/OiTSbLyw7wyP+wCcTf0MbyTfm0EAhklurNQr1/UvS51aGdI+w0G0HFAE/LJFYWc985giLZkCEKkSei+nmSglnTjd2yyAXqc1zQlq0fEpaOMEbzju+xzJvk2IRxTRM1bRWc8inoKiPhIBACme+cvhk4vPGe8bbu1YLggRqpPXhbuoc4iG9p6wht2O4231Kuz1mY2sPXm6NMplM7CMkqSCxL9Re/S8jJX9Cylh5i02I9FQuGe7h2aieFs/i8bPiqboFJRNOPs7tnlf4LTV+dBFarIReHsVpFxLefXhgiuPVAwdb4hcHKs+l7offp/z88WEm9A5Z3b5QQpnDY95/n5PJ7pEFwvYhZIUAYlhoVwEns5fdqGRE2sCwDUQGWTLIv2rNoKWNKIrCTcfURIi6SBd14UYyC92VYLuZRWrBRQeCBRGpmRYThWSj1YBhYgg4uGgDgYAwFrIKQpYhAf9fz31zk/syk7TpsidQfbGfbwTBj3uPerPROPoWywyi5A1IaMhbCmTlNYc/VW9DQ8B+n0XCQo6gIEFkmxPsc0hD4CHReweBhuztKQWJhj1k7/4+m9x3dbI9WeYoh6F/3o2Ds3p37CFYyhSn3CfJyxzk7NEyneHJJMOeiTOLCDQkuT/QLyUNoWUO5XEX22n7/Jpz6dDZUV+ChiylEvvatQMsc1Jx+sNKaxSs/bEXb11yOrZqFUAJlgMliGV25Kd9BkoLmQDuW0AdeATnkc49kQmgYjA/CDXizL70e069A4az7DtOv0NkIBOJzMqzZjBrYjCA6bFD0WSCULl1ZZ1RsCpRDiSj2MoIWmCDYZbT7XpeC/UOjWSZWJWtTCnYA2lsF+0DEyqBfkaz2pU7lcHoGuKywTCLMouVt3r1GlLv2XmzebvEd4LEpa/ECHIVXMssYG8z78AIOZ0afpuqMBsieaET2gOx/aRSVdOupZe0pFuO+ZQCye4zvUUqcDkEcNXq4Qoi+LUEo+ibTwBx5xq2KyWGpByCZwbsjfq4IC7B5zhXqXCRUGQlpATlMet5BoWkj170nCqex+pTiRQf3G3SH4JVDC3S7xAyskPihgdw/g7EKE6BpD7tMMftEIYDeZFAR7jfcTG3Z1EIYOqHSNbABf2OK3rYufAVfmTQwMFT1oGBW12gptG+QEeDcAQMAuzVdmGxmkbRLRUq4CmgKoULF9zCyRUPymXXLVPl6z8JF0X/cRzy4WED6p5WgcVvPCzWZskdfySbOMMwpIFgHKKmIRvHC1nIGZoh0yZxdBjHQKP4J3AjYWTFQvRpSAMDjQTg+dMQAhExEdGJxvxpSPETzTTII1gkJKwTmIYkb3IzpyHx+y/kEZzPHD5CJ9Q0ZKs4k6RpCMIqIsxkGELTkDBb3MoYhzINIReRTIYhPA3JhaYhMWjIvS4R7B9vdKXAf0E35Ga6o4FpSOAhyNCvD7WByMmwXh++l2lI5ueBhj6rTgl7SM3CEKJ+fcK59qn35vM0JEvTkGf9UnKJNHuIs2uhYje85pzbOO/aHa6VwCX2d+TaG+mU4A9xjzTE6lxyzh3SEHs8mVAuMQhpCLEEt2w03nxxiZo6A2QjSOgaok9DwHZ8vwWZCEB8pLOQsZCG6C4BOJKJERjkErqGSKcEbBANm+MSMg0JsV2v33ScZt/r6v7C05DS/GlItzoy86aN4APaqQARMQJpWxxo0xCCq1bexnzpFEF1xs6j84ortbJoe7oXkhyzt00UlE6pKooXclpz8iNvQuLS0pyyaGxk1rNpLfF01rc2PWNSM620Z5VFkabtxyO5tUf4kiIjvZKrsQ78CuY0Okfn22aVLASkPK60b7SyqBGKulHIuWVR0BwDLwRnKYuCjOZim1WCaOHV4a9lUVaJsUkohm2CZSLsLxI3gElEJNAJLouWFymLAqdvQBCwRcuixbtShbuiWlnU/fpisRzckYhQICGlu5m69Bv4vwO7bblvxwAAAABJRU5ErkJggg==';
var LEFT_KEY = 37;
var PLAYER_SHEET_SRC = 'data:image/png;base64,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';
var RIGHT_KEY = 39;
var SHOOT_KEY = 88;
var TEXT_BLINK_FREQ = 500;
var PLAYER_CLIP_RECT = { x: 0, y: 0, w: 100, h: 100 };
var ALIEN_BOTTOM_ROW = [ { x: 0, y: 0, w: 60, h: 35 }, { x: 0, y: 35, w: 60, h: 35 }];
var ALIEN_MIDDLE_ROW = [ { x: 0, y: 70, w: 60, h: 40 }, { x: 0, y: 105, w: 60, h: 40 }];
var ALIEN_TOP_ROW = [ { x: 0, y: 140, w: 60, h: 50 }, { x: 0, y: 175, w: 60, h: 50 }];
var ALIEN_X_MARGIN = 40;
var ALIEN_SQUAD_WIDTH = 11 * ALIEN_X_MARGIN;



// ###################################################################
// Utility functions & classes
//
// ###################################################################
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function valueInRange(value, min, max) {
  return (value <= max) && (value >= min);
}
 
function checkRectCollision(A, B) {
  var xOverlap = valueInRange(A.x, B.x, B.x + B.w) ||
  valueInRange(B.x, A.x, A.x + A.w);
 
  var yOverlap = valueInRange(A.y, B.y, B.y + B.h) ||
  valueInRange(B.y, A.y, A.y + A.h); 
  return xOverlap && yOverlap;
}

var Point2D = Class.extend({
  init: function(x, y) {
    this.x = (typeof x === 'undefined') ? 0 : x;
    this.y = (typeof y === 'undefined') ? 0 : y;
  },
  
  set: function(x, y) {
    this.x = x;
    this.y = y;
  }
});

var Rect = Class.extend({
  init: function(x, y, w, h) {
    this.x = (typeof x === 'undefined') ? 0 : x;
    this.y = (typeof y === 'undefined') ? 0 : y;
    this.w = (typeof w === 'undefined') ? 0 : w;
    this.h = (typeof h === 'undefined') ? 0 : h;
  },
  
  set: function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
});



// ###################################################################
// Globals
//
// ###################################################################
var canvas = null;
var ctx = null;
var spriteSheetImg = null;
var playerspriteSheetImg = null;
var bulletImg = null;
var keyStates = null;
var prevKeyStates = null;
var lastTime = 0;
var player = null;
var aliens = [];
var particleManager = null;
var updateAlienLogic = false;
var alienDirection = -1;
var alienYDown = 0;
var alienCount = 0;
var wave = 1;
var hasGameStarted = false;



// ###################################################################
// Entities
//
// ###################################################################
var BaseSprite = Class.extend({
  init: function(img, x, y) {
    this.img = img;
    this.position = new Point2D(x, y);
    this.scale = new Point2D(1, 1);
    this.bounds = new Rect(x, y, this.img.width, this.img.height);
    this.doLogic = true;
  },
                           
  update: function(dt) { },
  
  _updateBounds: function() {
     this.bounds.set(this.position.x, this.position.y, ~~(0.5 + this.img.width * this.scale.x), ~~(0.5 + this.img.height * this.scale.y));
  },
  
  _drawImage: function() {
    ctx.drawImage(this.img, this.position.x, this.position.y);
  },
  
  draw: function(resized) {
    this._updateBounds();
    
    this._drawImage();
  }
});

var SheetSprite = BaseSprite.extend({
  init: function(sheetImg, clipRect, x, y) {
    this._super(sheetImg, x, y);
    this.clipRect = clipRect;
    this.bounds.set(x, y, this.clipRect.w, this.clipRect.h);
  },
  
  update: function(dt) {},
  
  _updateBounds: function() {
    var w = ~~(0.5 + this.clipRect.w * this.scale.x);
    var h = ~~(0.5 + this.clipRect.h * this.scale.y);
    this.bounds.set(this.position.x - w/2, this.position.y - h/2, w, h);
  },
  
  _drawImage: function() {
    ctx.save();
    ctx.transform(this.scale.x, 0, 0, this.scale.y, this.position.x, this.position.y);
    ctx.drawImage(this.img, this.clipRect.x, this.clipRect.y, this.clipRect.w, this.clipRect.h, ~~(0.5 + -this.clipRect.w*0.5), ~~(0.5 + -this.clipRect.h*0.5), this.clipRect.w, this.clipRect.h);
    ctx.restore();

  },
  
  draw: function(resized) {
    this._super(resized);
  }
});

var Player = SheetSprite.extend({
  init: function() {
    this._super(playerspriteSheetImg, PLAYER_CLIP_RECT, CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
    this.scale.set(0.85, 0.85);
    this.lives = 3;
    this.xVel = 0;
    this.bullets = [];
    this.bulletDelayAccumulator = 0;
    this.score = 0;
  },
  
  reset: function() {
    this.lives = 3;
    this.score = 0;
    this.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
  },
  
  shoot: function() {
    var bullet = new Bullet(this.position.x, this.position.y - this.bounds.h / 2, 1, 1000);
    this.bullets.push(bullet);
  },
  
  handleInput: function() {
    if (isKeyDown(LEFT_KEY)) {
      this.xVel = -175;
    } else if (isKeyDown(RIGHT_KEY)) {
      this.xVel = 175;
    } else this.xVel = 0;
    
    if (wasKeyPressed(SHOOT_KEY)) {
      if (this.bulletDelayAccumulator > 0.5) {
        this.shoot(); 
        this.bulletDelayAccumulator = 0;
      }
    }
  },
  
  updateBullets: function(dt) {
    for (var i = this.bullets.length - 1; i >= 0; i--) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.update(dt);
      } else {
        this.bullets.splice(i, 1);
        bullet = null;
      }
    }
  },
  
  update: function(dt) {
    // update time passed between shots
    this.bulletDelayAccumulator += dt;
    
    // apply x vel
    this.position.x += this.xVel * dt;
    
    // cap player position in screen bounds
    this.position.x = clamp(this.position.x, this.bounds.w/2, CANVAS_WIDTH - this.bounds.w/2);
    this.updateBullets(dt);
  },
  
  draw: function(resized) {
    this._super(resized);

    // draw bullets
    for (var i = 0, len = this.bullets.length; i < len; i++) {
      var bullet = this.bullets[i];
      if (bullet.alive) {
        bullet.draw(resized);
      }
    }
  }
});

var Bullet = BaseSprite.extend({
  init: function(x, y, direction, speed) {
    this._super(bulletImg, x, y);
    this.direction = direction;
    this.speed = speed;
    this.alive = true;
  },

  update: function(dt) {
    this.position.y -= (this.speed * this.direction) * dt;
    
    if (this.position.y < 0) {
      this.alive = false;
    }
  },
  
  draw: function(resized) {
    this._super(resized);
  }
});

var Ebullet = BaseSprite.extend({
  init: function(x, y, direction, speed) {
    this._super(enemybulletImg, x, y);
    this.direction = direction;
    this.speed = speed;
    this.alive = true;
  },

  update: function(dt) {
    this.position.y -= (this.speed * this.direction) * dt;
    
    if (this.position.y < 0) {
      this.alive = false;
    }
  },
  
  draw: function(resized) {
    this._super(resized);
  }
});

var Enemy = SheetSprite.extend({
  init: function(clipRects, x, y) {
    this._super(spriteSheetImg, clipRects[0], x, y);
    this.clipRects = clipRects;
    this.scale.set(0.5, 0.5);
    this.alive = true;
    this.onFirstState = true;
    this.stepDelay = 2; // try 2 secs to start with...
    this.stepAccumulator = 0;
    this.doShoot - false;
    this.bullet = null;
  },
  
  toggleFrame: function() {
    this.onFirstState = !this.onFirstState;
    this.clipRect = (this.onFirstState) ? this.clipRects[0] : this.clipRects[1];
  },
  
  shoot: function() {
    this.bullet = new Ebullet(this.position.x, this.position.y + this.bounds.w/2, -1, 500);
  },
  
  update: function(dt) {
    this.stepAccumulator += dt;
    
    if (this.stepAccumulator >= this.stepDelay) {
      if (this.position.x < this.bounds.w/2 + 20 && alienDirection < 0) {
      updateAlienLogic = true;
    } if (alienDirection === 1 && this.position.x > CANVAS_WIDTH - this.bounds.w/2 - 20) {
      updateAlienLogic = true;
    }
      if (this.position.y > CANVAS_WIDTH - 50) {
        reset();
      }
      
      var fireTest = Math.floor(Math.random() * (this.stepDelay + 1));
      if (getRandomArbitrary(0, 1000) <= 5 * (this.stepDelay + 1)) {
        this.doShoot = true;
      }
      this.position.x += 10 * alienDirection;
      this.toggleFrame();
      this.stepAccumulator = 0;
    }
    this.position.y += alienYDown;
    
    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.update(dt);  
    } else {
      this.bullet = null;
    }
  },
  
  draw: function(resized) {
    this._super(resized);
    if (this.bullet !== null && this.bullet.alive) {
      this.bullet.draw(resized);
    }
  }
});

var ParticleExplosion = Class.extend({
  init: function() {
    this.particlePool = [];
    this.particles = [];
  },
  
  draw: function() {
    for (var i = this.particles.length - 1; i >= 0; i--) {
      var particle = this.particles[i];
      particle.moves++;
	    particle.x += particle.xunits;
		  particle.y += particle.yunits + (particle.gravity * particle.moves);
			particle.life--;
			
			if (particle.life <= 0 ) {
				if (this.particlePool.length < 100) {
					this.particlePool.push(this.particles.splice(i,1));
				} else {
					this.particles.splice(i,1);
				}
			} else {
				ctx.globalAlpha = (particle.life)/(particle.maxLife);
				ctx.fillStyle = particle.color;
				ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
				ctx.globalAlpha = 1;
			}
    }
  },
  
  createExplosion: function(x, y, color, number, width, height, spd, grav, lif) {
  for (var i =0;i < number;i++) {
			var angle = Math.floor(Math.random()*360);
			var speed = Math.floor(Math.random()*spd/2) + spd;	
			var life = Math.floor(Math.random()*lif)+lif/2;
			var radians = angle * Math.PI/ 180;
			var xunits = Math.cos(radians) * speed;
			var yunits = Math.sin(radians) * speed;
				
			if (this.particlePool.length > 0) {
				var tempParticle = this.particlePool.pop();
				tempParticle.x = x;
				tempParticle.y = y;
				tempParticle.xunits = xunits;
				tempParticle.yunits = yunits;
				tempParticle.life = life;
				tempParticle.color = color;
				tempParticle.width = width;
				tempParticle.height = height;
				tempParticle.gravity = grav;
				tempParticle.moves = 0;
				tempParticle.alpha = 1;
				tempParticle.maxLife = life;
				this.particles.push(tempParticle);
			} else {
				this.particles.push({x:x,y:y,xunits:xunits,yunits:yunits,life:life,color:color,width:width,height:height,gravity:grav,moves:0,alpha:1, maxLife:life});
			}	
	
		}
  }
});



// ###################################################################
// Initialization functions
//
// ###################################################################
function initCanvas() {
  // create our canvas and context
  canvas = document.getElementById('game-canvas');
  ctx = canvas.getContext('2d');
  
  // turn off image smoothing
  setImageSmoothing(false);

   // create our main player sheet img
   playerspriteSheetImg = new Image();
   playerspriteSheetImg.src = PLAYER_SHEET_SRC;  
   preDrawImages();
  
  // create our main sprite sheet img
  spriteSheetImg = new Image();
  spriteSheetImg.src = SPRITE_SHEET_SRC;  
  preDrawImages();

  // add event listeners and initially resize
  window.addEventListener('resize', resize);
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
}

function preDrawImages() {
  var canvas = drawIntoCanvas(2, 8, function(ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    });
    bulletImg = new Image();
    bulletImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAMAAADTAfSvAAAA+VBMVEUAAAAxoU4vok4smUksoUssmEgtmUkrn0oqoUopoEovm0svmUsvmUsvnUwvo04kmkUnhEEso0wngD8spEwngEA6p1c8pVg8pFg8pVgwnk0ngEA2o1M5plYpm0gpm0comUYomEYpmUcomUYmnkYnlEUnkUQnkkQnkkQokUQmfD4olEUnkUQmnUYUnjwZr0Mas0UB1z8km0UngUArpUsIxD4Tnjong0EjnkUqmkgqoUolez0jbjkjbzkkdTsiZzciaDckdjwnfz8meD0ldz0jbDgnf0AkcToiZzYkcjoldTwjbTkiaTciajgjbDkldjwkczslej0pmEcplkYFfQrNAAAAOnRSTlMAAAAAAAAAAABl6ujp4Dlv9j/2P/ZthYSCufqiX9O407jTuJu9u7u62f3MuocGBwcDc/ZEBAX2b/Y/Y8vl0QAAAAlwSFlzAAAASAAAAEgARslrPgAAALVJREFUGNNjYAADRk4ubm4eXj4mBmTAzG9lbWMtIMiCIsrKb2tnbyckjC7qABQVobmoqJg4EEhIgtwgJS0B4ojJMMg6OoGAs4u9vb0NmOnkKscg7+ZuBwL2IABmubspAEUhAghg54FLVNHTxQsIXLyBfB9fMNNPiUFZRVVNTU1dwx/oBk0tbSBbVUWHQVdPHwgMDEHuNTI2AXH0TGkeOtjigo0/AOhSM7R4YzcPDAoKsrDkgHABgC82a6FuLHAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDktMDZUMDg6NDM6MTEtMDQ6MDB84+l6AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA5LTA2VDA4OjQzOjExLTA0OjAwDb5RxgAAAABJRU5ErkJggg==';
    enemybulletImg = new Image();
    enemybulletImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAHCAMAAADQ1/Y0AAAAQlBMVEX/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AACsQjzQAAAAFXRSTlMVj9vgjhSD+vmA1dTnztN0938PhtqPTpYEAAAACXBIWXMAAMnRAADJ0QFs31rnAAAANUlEQVQI12NgYGRiRgVMLKwMbOyi6ICDk4FLFBNwM/BgEeVh4MUiysfAL4BpriCDkLAIphsAkSIIwqFZeqYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDktMDZUMDg6NDc6NDEtMDQ6MDA96EdkAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA5LTA2VDA4OjQ3OjQxLTA0OjAwTLX/2AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAZdEVYdFRpdGxlAG1pbnVzIHNpZ24gc3VidHJhY3T15J0wAAAAAElFTkSuQmCC';
}

function setImageSmoothing(value) {
  this.ctx['imageSmoothingEnabled'] = value;
  this.ctx['mozImageSmoothingEnabled'] = value;
  this.ctx['oImageSmoothingEnabled'] = value;
  this.ctx['webkitImageSmoothingEnabled'] = value;
  this.ctx['msImageSmoothingEnabled'] = value;
}

function initGame() {
  dirtyRects = [];
  aliens = [];
  player = new Player();
  particleManager = new ParticleExplosion();
  setupAlienFormation();  
  drawBottomHud();
}

function setupAlienFormation() {
  alienCount = 0;
  for (var i = 0, len = 5 * 11; i < len; i++) {
    var gridX = (i % 11);
    var gridY = Math.floor(i / 11);
    var clipRects;
    switch (gridY) {
      case 0: 
      case 1: clipRects = ALIEN_BOTTOM_ROW; break;
      case 2: 
      case 3: clipRects = ALIEN_MIDDLE_ROW; break;
      case 4: clipRects = ALIEN_TOP_ROW; break;
    }
    aliens.push(new Enemy(clipRects, (CANVAS_WIDTH/2 - ALIEN_SQUAD_WIDTH/2) + ALIEN_X_MARGIN/2 + gridX * ALIEN_X_MARGIN, CANVAS_HEIGHT/3.25 - gridY * 40));
    alienCount++;
  }
}

function reset() {
  aliens = [];
  setupAlienFormation();
  player.reset();
}

function init() {
  initCanvas();
  keyStates = [];
  prevKeyStates = [];
  resize();
}



// ###################################################################
// Helpful input functions
//
// ###################################################################
function isKeyDown(key) {
  return keyStates[key];
}

function wasKeyPressed(key) {
  return !prevKeyStates[key] && keyStates[key];
}


// ###################################################################
// Drawing & Update functions
//
// ###################################################################
function updateAliens(dt) {
  if (updateAlienLogic) {
    updateAlienLogic = false;
    alienDirection = -alienDirection;
    alienYDown = 25;
  }
  
  for (var i = aliens.length - 1; i >= 0; i--) {
    var alien = aliens[i];
    if (!alien.alive) {
      aliens.splice(i, 1);
      alien = null;
      alienCount--;
      if (alienCount < 1) {
        wave++;
        setupAlienFormation();
      }
      return;
    }
    
    alien.stepDelay = ((alienCount * 20) - (wave * 10)) / 1000;
    if (alien.stepDelay <= 0.05) {
      alien.stepDelay = 0.05;
    }
    alien.update(dt);
    
    if (alien.doShoot) {
      alien.doShoot = false;
      alien.shoot();
    }
  }
  alienYDown = 0;
}

function resolveBulletEnemyCollisions() {
  var bullets = player.bullets;
  
  for (var i = 0, len = bullets.length; i < len; i++) {
    var bullet = bullets[i];
    for (var j = 0, alen = aliens.length; j < alen; j++) {
      var alien = aliens[j];
      if (checkRectCollision(bullet.bounds, alien.bounds)) {
        alien.alive = bullet.alive = false;
        particleManager.createExplosion(alien.position.x, alien.position.y, 'white', 70, 5,5,3,.15,50);
        player.score += 11;
      }
    }
  }
}

function resolveBulletPlayerCollisions() {
  for (var i = 0, len = aliens.length; i < len; i++) {
    var alien = aliens[i];
    if (alien.bullet !== null && checkRectCollision(alien.bullet.bounds, player.bounds)) {
      if (player.lives === 0) {
        hasGameStarted = false;
      } else {
       alien.bullet.alive = false;
       particleManager.createExplosion(player.position.x, player.position.y, 'green', 100, 8,8,6,0.001,40);
       player.position.set(CANVAS_WIDTH/2, CANVAS_HEIGHT - 70);
       player.lives--;
        break;
      }

    }
  }
}

function resolveCollisions() {
  resolveBulletEnemyCollisions();
  resolveBulletPlayerCollisions();
}

function updateGame(dt) {
  player.handleInput();
  prevKeyStates = keyStates.slice();
  player.update(dt);
  updateAliens(dt);
  resolveCollisions();
}

function drawIntoCanvas(width, height, drawFunc) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');
  drawFunc(ctx);
  return canvas;
}

function fillText(text, x, y, color, fontSize) {
  if (typeof color !== 'undefined') ctx.fillStyle = color;
  if (typeof fontSize !== 'undefined') ctx.font = fontSize + 'px Play';
  ctx.fillText(text, x, y);
}

function fillCenteredText(text, x, y, color, fontSize) {
  var metrics = ctx.measureText(text);
  fillText(text, x - metrics.width/2, y, color, fontSize);
}

function fillBlinkingText(text, x, y, blinkFreq, color, fontSize) {
  if (~~(0.5 + Date.now() / blinkFreq) % 2) {
    fillCenteredText(text, x, y, color, fontSize);
  }
}

function drawBottomHud() {
  ctx.fillStyle = '#02ff12';
  ctx.fillRect(0, CANVAS_HEIGHT - 30, CANVAS_WIDTH, 2);
  fillText(player.lives + ' x ', 10, CANVAS_HEIGHT - 7.5, 'white', 20);
  ctx.drawImage(playerspriteSheetImg, player.clipRect.x, player.clipRect.y, player.clipRect.w, 
                 player.clipRect.h, 45, CANVAS_HEIGHT - 23, player.clipRect.w * 0.5,
                 player.clipRect.h * 0.5);
  fillText('CREDIT: ', CANVAS_WIDTH - 115, CANVAS_HEIGHT - 7.5);
  fillCenteredText('SCORE: ' + player.score, CANVAS_WIDTH/2, 20);
  fillBlinkingText('00', CANVAS_WIDTH - 25, CANVAS_HEIGHT - 7.5, TEXT_BLINK_FREQ);
}

function drawAliens(resized) {
  for (var i = 0; i < aliens.length; i++) {
    var alien = aliens[i];
    alien.draw(resized);
  }
}

function drawGame(resized) {
  player.draw(resized);  
  drawAliens(resized);
  particleManager.draw();
  drawBottomHud();
}

function drawStartScreen() {
  fillCenteredText("+ = To shoot", CANVAS_WIDTH/2, CANVAS_HEIGHT/2.4, '#FFFFFF', 36);
  fillCenteredText("Arrow Keys = To move", CANVAS_WIDTH/2, CANVAS_HEIGHT/2.75, '#FFFFFF', 36);
  fillBlinkingText("ENTER TO START", CANVAS_WIDTH/2, CANVAS_HEIGHT/2, 500, '#FFFFFF', 36);
}

function animate() {
  var now = window.performance.now();
  var dt = now - lastTime;
  if (dt > 100) dt = 100;
  if (wasKeyPressed(13) && !hasGameStarted) {
    initGame();
    hasGameStarted = true;
  }
  
  if (hasGameStarted) {
     updateGame(dt / 1000);  
  }

 
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (hasGameStarted) {
    drawGame(false);
  } else {
    drawStartScreen();
  }
  lastTime = now;
  requestAnimationFrame(animate);
}



// ###################################################################
// Event Listener functions
//
// ###################################################################
function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;

	// calculate the scale factor to keep a correct aspect ratio
  var scaleFactor = Math.min(w / CANVAS_WIDTH, h / CANVAS_HEIGHT);
  
  if (IS_CHROME) {
    canvas.width = CANVAS_WIDTH * scaleFactor;
    canvas.height = CANVAS_HEIGHT * scaleFactor;
    setImageSmoothing(false);
    ctx.transform(scaleFactor, 0, 0, scaleFactor, 0, 0);   
  } else {
    // resize the canvas css properties
    canvas.style.width = CANVAS_WIDTH * scaleFactor + 'px';
    canvas.style.height = CANVAS_HEIGHT * scaleFactor + 'px'; 
  }
}

function onKeyDown(e) {
  e.preventDefault();
  keyStates[e.keyCode] = true;
}

function onKeyUp(e) {
  e.preventDefault();
  keyStates[e.keyCode] = false;
}


// ###################################################################
// Start game!
//
// ###################################################################
window.onload = function() {
  init();
  animate();
};