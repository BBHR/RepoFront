<!DOCTYPE html>
<html lang="" ng-app='BiBiApp'>

<head>
    <!-- <base href='/'> -->
    <meta charset="UTF-8">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->
    <meta name="description" content="">
    <meta name="author" content="">
    <title>BibiHelper</title>
    <link rel="shortcut icon" href="">
    <link rel="stylesheet" href="css/bundle.css">
    <link rel="stylesheet" href="css/bundle-mid.css">
    <link rel="stylesheet" href="css/bundle-small.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/bootstrap-skin.css">
    <link rel="stylesheet" href="css/normalize.css">
    <!-- <link rel="stylesheet" href="css/media-queries.css"> -->
    <link rel="stylesheet" href="css/angular-material.min.css">
    <!-- <script type='text/javascript' src='/js/select.js'></script> -->
    <script type='text/javascript' src='js/angular.min.js'></script>
    <script type='text/javascript' src='js/angular-route.min.js'></script>
    <script type='text/javascript' src='js/angular-animate.min.js'></script>
    <script type='text/javascript' src="js/angular-aria.min.js"></script>
    <script type='text/javascript' src="js/angular-messages.min.js"></script>
    <script type='text/javascript' src="js/angular-material.min.js"></script>


    <!--[if IE]>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body ng-controller='RootCtrl as root'>
    <div class="container-fluid">
        <header class="header container">
            <div class="logotype clearfix">
                <div class="col-md-4 col-sm-12 logo">
                    <a href="#/"><img src="images/logo.jpg" alt="lotogip"></a>
                </div>
                <div class="col-md-8 col-sm-12 logo-2">
                    <div class="col-md-4 col-sm-4 col-xs-12 info-box1">
                        <div class="add-company" ng-if='!user'>
                            <a class='link' ng-click="root.unhandled()">Добавить компанию</a>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12 info-box1">
                        <div class="info-select-box">
                          <div class='c-dropdown-list' ng-click='root.toggleclv()'>
                            <span class='c-dropdown-list__switch' ng-class="{'c-dropdown-list__switch--active':root.clv}" >
                              <span class='c-dropdown-list__arrow'>&#8250;</span>
                              {{ root.chosenCity ? root.chosenCity : 'Выбрать город'}}
                            </span>
                            <ul class='c-dropdown-list__list' ng-show='root.clv' class=''>
                              <li class="c-dropdown-list__list-item" ng-click='root.choose(city)' ng-repeat='city in root.cities'>
                                {{city}}
                              </li>
                            </ul>
                          </div>
                            <!-- <form action="#">
                                <select class="turnintodropdown select-info-box">
                                    <option>Выберите город </option>
                                    <option>Новосибирск</option>
                                    <option>Красноярск</option>
                                    <option>Самара</option>
                                    <option>Волгоград</option>
                                </select>
                            </form>
                            <select name="" id="" class="select-info-box">
                                <option value="">Выберите город</option>
                                <option value="">Новосибирск</option>
                                <option value="">Красноярск</option>
                                <option value="">Самара</option>
                                <option value="">Волгоград</option>
                            </select>
                            <span class="select-cursor">&#8250;</span> -->
                        </div>
                    </div>
                    <div class='col-md-4 col-sm-4 col-xs-12' ng-if='!user'>
                        <!-- <div class='profile-menu-top'> -->
                            <div class="col-md-9 col-sm-9 col-xs-9 info-box1">
                              <div class="personal-account">
                                <!-- <img src="images/personal-account.png" alt="" /> -->
                                <a class='e-black-link' ng-click='root.openAuth()'>Личный кабинет</a>
                              </div>
                            </div>
                        <!-- </div> -->
                    </div>
                    <div class='col-md-4 col-sm-4 col-xs-12 info-container' ng-if='user'>
                        <div class='profile-menu-top'>
                            <div class="col-md-9 col-sm-9 col-xs-9 info-box1">
                                <div class="personal-account">
                                    <a href="#/me">{{user.user_surname + ' ' + user.user_name[0] + '.'}}</a>
                                </div>
                            </div>
                            <div class="col-md-3 col-sm-3 col-xs-3 info-box1">
                                <div class='personal-image'>
                                    <a href='#/me'>
                                        <img ng-src='{{user.avatar ? user.avatar : "images/no-image.png"}}' />
                                    </a>
                                </div>
                            </div>
                            <div class='hidden-menu'>
                                
                                <!-- <a href='#'>Предложение разработчикам</a> -->
                                <div class='hidden-menu-footer'>
                                    <a href='#/main' ng-click='root.logout()'>Выход</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <section class="header slogan" ng-include='root.getHeader()'>
            </section>
        </header>
        <main class="main" ng-view>
        </main>
        <!--                                Footer - Подвал                            -->

        <footer>
            <section class="footer clearfix">
                <div class="col-md-8 footer-box1 clearfix">
                    <div class="col-md-4 col-sm-4 col-xs-6 footer-content">
                        <h6>О проекте</h6>
                        <ul>
                            <li><a href="#/about">Как это работает</a></li>
                            <li><a href="#/news">Новости</a></li>
                            <li><a href="#/vacancy">Вакансии</a></li>

                        </ul>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6 footer-content">
                      <h6>Компаниям</h6>
                      <ul>
                          <li><a class='link' ng-click="root.unhandled()">Добавить компанию</a></li>
                      </ul>
                        <!-- <h6>Автовладельцам</h6>
                        <ul>
                            <li><a href="#">Поиск</a></li>
                            <li><a href="#">Расширенный поиск</a></li>
                            <li><a href="#">Автотехцентры</a></li>

                        </ul> -->
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6 footer-content">

                        <h6>Личный кабинет</h6>
                        <ul>
                            <li><a href='#/main' ng-click='root.openAuth()' ng-if='!user'>Вход</a></li>
                            <li><a href="#/registration" ng-if='!user'>Регистрация</a></li>
                            <li><a href="#/main" ng-if='user' ng-click='root.logout()'>Выход</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-box2 col-md-4">
                    <h6>Мы в социальных сетях</h6>
                    <ul>
                        <li>
                            <a href="http://vk.com/bibihelper" target="_blank"><img src="images/vkontakte.jpg" alt="Вконтакте"></a>
                        </li>
                        <!-- <li>
                            <a href="https://www.facebook.com/" target="_blank"><img src="images/fasebook.jpg" alt="Фэйсбук"></a>
                        </li>
                        <li>
                            <a href="https://twitter.com/" target="_blank"><img src="images/twitter.jpg" alt="Твиттер"></a>
                        </li> -->
                    </ul>
                    <a class="qwestion link" ng-click="root.unhandled()">
                        <img src="images/qwestion.jpg" alt="Вопрос">
                        <h6> Остались  вопросы?</h6>
                    </a>
                </div>
            </section>
            <div class="copyright">
                <p>&copy; 2015-2016 BiBiHelper - информационная автомобильная система</p>
            </div>
        </footer>
    </div>

    <div class='modal-overlay' ng-if='!user' ng-show='root.showAuthorize' ng-click='root.hideAuth()'>
        <div class='modal-window authorization-window' ng-click='prevent($event)'>
            <form ng-submit='root.login(loginInfo)' autocomplete="off">
                <header class='modal-window-header'>
                    <div class='control-container'>
                        <a class="control-close" ng-click='root.hideAuth()'> <img src="images/close.svg" alt="Закрыть" /> </a>
                    </div>
                    <h1> Вход в личный кабинет </h1>
                </header>
                <div class='modal-window-content'>
                    <ul>
                        <li>
                            <input type='text' ng-class="{'input-error':root.loginErrors.username}" ng-model='root.loginInfo.username' ng-blur='root.validate(["username"])' name='username' placeholder="e-mail или логин" autocomplete="user_email" />
                            <label class="e-input-error" for="" ng-repeat="error in root.loginErrors.username">{{error}}</label>
                        </li>
                        <li>
                            <input type='password' ng-class="{'input-error':root.loginErrors.password}" ng-model='root.loginInfo.password' ng-blur='root.validate(["password"])' name='password' placeholder="пароль" autocomplete="user_password" />
                            <label class="e-input-error" for="" ng-repeat="error in root.loginErrors.password">{{error}}</label>
                        </li>
                        <li>
                            <a href='#/restore' class='e-black-link'> Забыли пароль? </a>
                            <md-checkbox ng-model='root.loginInfo.rememberMe'>
                                запомнить
                            </md-checkbox>
                        </li>
                    </ul>
                    <button class='standard-button' type="submit"> Войти </button> <a class='e-black-link' href='#/registration'>Регистрация</a>
                </div>
            </form>
        </div>
    </div>



    <div class='modal-overlay' ng-show='root.showUnhandled' ng-click='root.unhandled()'>
        <div class='modal-window authorization-window' ng-click='prevent($event)'>

                <header class='modal-window-header'>
                    <div class='control-container'>
                        <a class="control-close" ng-click='root.unhandled()'> <img src="images/close.svg" alt="Закрыть" /> </a>
                    </div>
                    <h3> {{root.unhandledText}} </h3>
                </header>
                <!-- <div class='modal-window-content'>
                    <ul>
                        <li>
                            <input type='email' ng-model='root.loginInfo.username' placeholder="e-mail или логин" />
                            <label class="e-input-error" for="" ng-repeat="error in root.loginErrors.username">{{error}}</label>
                        </li>
                        <li>
                            <input type='password' ng-model='root.loginInfo.password' placeholder="пароль" />
                            <label class="e-input-error" for="" ng-repeat="error in root.loginErrors.password">{{error}}</label>
                        </li>
                        <li>
                            <a href='#/passrestore' class='e-black-link'> Забыли пароль? </a>
                            <md-checkbox ng-model='root.loginInfo.rememberMe'>
                                запомнить
                            </md-checkbox>
                        </li>
                    </ul>
                    <button class='standard-button' type="submit"> Войти </button> <a class='e-black-link' href='#/regtype'>Регистрация</a>
                </div> -->

        </div>
    </div>

    <div class="c-whitescreen" ng-class='{"c-whitescreen--fade" : blurWhiteScreen}' ng-hide='loadComplete'></div>
    <!--////////////////////////////////////////////////////////////////////////////////////////-->
    <script type='text/javascript' src="js/jquery-2.1.4.min.js"></script>
    <script type='text/javascript' src="js/jquery.mask.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/function.js"></script>
    <script type='text/javascript' src='build/app.js'></script>
</body>

</html>
