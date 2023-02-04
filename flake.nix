{
  description = "software needed for publishing capcaitor apps";
  inputs = { nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.11"; };

  outputs = { self, nixpkgs }:
    let
      pkgs = import nixpkgs {
        system = "x86_64-linux";
        config = {
          android_sdk.accept_license = true;
          allowUnfree = true;
        };
      };
      # androidsdk = pkgs.androidenv.androidPkgs_9_0.androidsdk;
      androidPkgs = pkgs.androidenv.composeAndroidPackages {
        platformVersions = [ "32" ];
        buildToolsVersions = [ "30.0.3" ];
        abiVersions = [ "x86" "x86_64" ];
      };
    in {
      devShells.x86_64-linux.default = pkgs.mkShell {

        buildInputs = with pkgs; [ nodejs jdk11 androidPkgs.androidsdk glibc ];

        shellHook = with pkgs; ''
          export ANDROID_HOME="${androidPkgs.androidsdk}/libexec/android-sdk"
          # export ANDROID_HOME="$PWD/android_home"
        '';
      };
    };
}
